import ContactUs from "../../myComponent/ContactUs/ContactUs"
import CouponsDiscounts from "../../myComponent/Discount/Discount"
import Feature from "../../myComponent/Feature/Feature"
import HeroSection from "../../myComponent/Hero/Hero"
import Testimonials from "../../myComponent/Testimonial/Testimonial"
import WhyChooseUs from "../../myComponent/WhyChoose/WhyChoose"



const Homepage = () => {
    return (
        <div>
            <HeroSection />
            <Feature />
            <WhyChooseUs />
            <CouponsDiscounts />
            {/* <WhyChooseUs /> */}
            <Testimonials />
            <ContactUs />
        </div>
    )
}

export default Homepage
