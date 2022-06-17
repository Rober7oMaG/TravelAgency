import {Testimonial} from '../models/Testimonial.js'

const saveTestimonial = async (req, res) => {
    // Validate empty fields
    const {name, email, message} = req.body;
    const errors = [];

    if (name.trim() === '') {
        errors.push({message: "Name field is empty."});
    }

    if (email.trim() === '') {
        errors.push({message: "Email field is empty."});
    }

    if (message.trim() === '') {
        errors.push({message: "Message field is empty."});
    }

    if (errors.length > 0) {
        // Get testomials from database
        const testimonials = await Testimonial.findAll();

        res.render('testimonials', {
            page: 'Testimonials',
            errors,
            name, 
            email, 
            message,
            testimonials
        });
    } else {
        // Save testimonial on database
        try {
            await Testimonial.create({
                name, 
                email, 
                message
            });

            res.redirect('/testimonials');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    saveTestimonial
};