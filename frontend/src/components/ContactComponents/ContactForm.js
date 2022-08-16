import React from "react";

const ContactForm = () => {
    return (

        <div className="t1">
            <form action="https://formsubmit.co/vs61@queensu.ca" method="POST">
                <h1>Contact Us</h1>
                <p>Please take a moment to get in touch, we will get back to you shortly.</p>

                    <div class="column">
                        <label for="the-name">Your Name</label>
                        <input type="text" name="name" id="the-name" required/>

                        <label for="the-email">Email Address</label>
                        <input type="email" name="email" id="the-email" required/>

                        <label for="the-phone">Phone Number</label>
                        <input type="tel" name="phone" id="the-phone" required/>

                        <label for="the-reason">How can we help you?</label>
                        <select name="reason" id="the-reason" required>
                            <option value="new-project">I need a new project</option>
                            <option value="project-update">I need a project updated</option>
                            <option value="other">Other inquiry</option>
                        </select>
                    </div>
                    <div class="column">
                        <label for="the-message">Message</label>
                        <textarea name="message" id="the-message"></textarea>
                        <input type="submit" value="Send Message" required/>
                    </div>
                </form>
        </div>
    )
}

export default ContactForm