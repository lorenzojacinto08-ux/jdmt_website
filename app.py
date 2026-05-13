import os
from flask import Flask, render_template, request, jsonify
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('jdmt.html')

@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        
        name = data.get('name')
        email = data.get('email')
        project = data.get('project')
        message = data.get('message')
        
        sendgrid_api_key = os.environ.get('SENDGRID_API_KEY')
        recipient_email = os.environ.get('RECIPIENT_EMAIL', 'taniegrarj@jdmt-itservices.com')
        
        if not sendgrid_api_key:
            return jsonify({'error': 'Email service not configured'}), 500
        
        message_content = f"""
        New Contact Form Submission
        
        Name: {name}
        Email: {email}
        Project: {project}
        
        Message:
        {message}
        """
        
        sg = SendGridAPIClient(sendgrid_api_key)
        
        # Use recipient email as sender (must be verified in SendGrid)
        # Include customer email in reply_to and message body
        mail = Mail(
            from_email=recipient_email,
            to_emails=recipient_email,
            subject=f'New Contact from {name} - {project}',
            html_content=message_content.replace('\n', '<br>')
        )
        mail.reply_to = email
        
        response = sg.send(mail)
        
        return jsonify({'success': True, 'message': 'Message sent successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
