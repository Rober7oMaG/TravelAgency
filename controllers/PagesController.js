import {Trip} from "../models/Trip.js";
import {Testimonial} from '../models/Testimonial.js'

const homePage = async (req, res) => {
    // Get three trips and three testimonials from database
    const databasePromise = [];
    databasePromise.push(Trip.findAll({limit: 3}));
    databasePromise.push(Testimonial.findAll({limit: 3}));

    try {
        // Execute both querys at the same time
        const result = await Promise.all(databasePromise);

        res.render('home', {
            page: 'Home',
            homeClass: 'home',
            trips: result[0],
            testimonials: result[1]
        });
    } catch (error) {
        console.log(error);
    }
};

const aboutPage = (req, res) => {
    res.render('about', {
        page: 'About us'
    });
}

const tripsPage = async (req, res) => {
    // Consult database
    const trips = await Trip.findAll();

    res.render('trips', {
        page: 'Upcoming Trips',
        trips
    });
}

const tripDetailPage = async (req, res) => {
    const {slug} = req.params;

    try {
        const trip = await Trip.findOne({where: {slug}});
        res.render('trip', {
            page: 'Trip Information',
            trip
        })
    } catch (error) {
        console.log(error);
    }
}

const testimonialsPage = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll();

        res.render('testimonials', {
            page: 'Testimonials',
            testimonials
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    homePage,
    aboutPage,
    tripsPage,
    tripDetailPage,
    testimonialsPage
};