function Footer()
{
    return(
        <div>
            <footer className='footer_section'>
                <div>Questions?Call 1-844-505-2933</div>
                    <div className='footer_details'>
                        <div className='links_section'>
                            <ul>
                                <li>FAQ</li>
                                <li>Investor Relations</li>
                                <li>Ways to Watch</li>
                                <li>Corporate information</li>
                                <li>Notflix Originals</li>

                            </ul>
                        </div>
                        <div className='links_section'>
                            <ul>
                                <li>Help Center</li>
                                <li>Jobs</li>
                                <li>terms of Use</li>
                                <li>Contant Us</li>
                            </ul>
                        </div>

                        <div className='links_section'>
                            <ul>
                                <li>Account</li>
                                <li>Redeem Gift cards</li>
                                <li>Privacy</li>
                                <li>Speed Test</li>

                            </ul>
                        </div>


                        <div className='links_section'>
                            <ul>
                                <li>Media Center</li>
                                <li>Buy Gift Cards</li>
                                <li>Cookie Preferences</li>
                                <li>Legal Notices</li>
                            </ul>
                        </div>

                    </div>

                    <div className='footer_btn'>
                        <i className="fa-solid fa-globe"></i>
                            <select className='select_btn' >
                                <option >English</option>
                                <option >Tamil</option>
                                <option >Telugu</option>
                            </select>
                    </div>
            </footer>
        </div>
    )
}

export default Footer;