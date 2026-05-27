'use client';

import { useState, useEffect, FormEvent } from 'react';

const CONFIG = {
  PHONE: '+1 (469) 452-7454',
  ADDRESS: '701 Peterhouse Dr',
  EMAIL: 'birvuni@gmail.com',
};

export default function Home() {
  const [isSticky, setIsSticky] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Modal states
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Track scroll position for sticky header and scroll progress circle
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // Sticky header threshold
      setIsSticky(scrollPos > 150);

      // Back to top button threshold
      setShowScrollTop(scrollPos > 50);

      // Scroll progress percentage (0 to 307.919 for SVG stroke-dashoffset)
      if (docHeight > 0) {
        const pct = scrollPos / docHeight;
        setScrollProgress(pct);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          desc,
          honeypot,
        }),
      });

      if (response.ok) {
        setFormStatus('success');
        setName('');
        setEmail('');
        setPhone('');
        setDesc('');
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Handy&Man Handyman Services",
    "image": "https://handytx.com/assets/images/about/17.jpg",
    "@id": "https://handytx.com/#business",
    "url": "https://handytx.com",
    "telephone": "+14694527454",
    "email": "birvuni@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "701 Peterhouse Dr",
      "addressLocality": "McKinney",
      "addressRegion": "TX",
      "postalCode": "75071",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 33.179566,
      "longitude": -96.772999
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "McKinney" },
      { "@type": "AdministrativeArea", "name": "Frisco" },
      { "@type": "AdministrativeArea", "name": "Allen" },
      { "@type": "AdministrativeArea", "name": "Plano" },
      { "@type": "AdministrativeArea", "name": "Dallas" },
      { "@type": "AdministrativeArea", "name": "Collin County" }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.youtube.com/@MeVova"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {/* header style two */}
      <header id="home" className="rts-header-area header-one">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="header--one-main">
                <div className="row align-items-center header-top-one">
                  <div className="col-lg-3">
                    <a href="/" className="logo-area">
                      <img src="/assets/images/logo/my_logo2.png" alt="logo-area" style={{ height: '100px' }} />
                    </a>
                  </div>
                  <div className="col-lg-9">
                    <div className="header-right-area">
                      {/* single info wrapper */}
                      <div className="single-info-contact">
                        <i className="fa-light fa-clock"></i>
                        <div className="inner-content">
                          <span>24/7 Emergency call</span>
                          <a href="#">
                            <h6 className="title">Mon (to) Sun: 9:00-7:00</h6>
                          </a>
                        </div>
                      </div>
                      {/* single info wrapper end */}
                      {/* single info wrapper */}
                      <div className="single-info-contact map">
                        <i className="fa-light fa-location-dot"></i>
                        <div className="inner-content">
                          <span>Company Location</span>
                          <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
                            <h6 className="title">{CONFIG.ADDRESS}</h6>
                          </a>
                        </div>
                      </div>
                      {/* single info wrapper end */}
                      {/* button area start */}
                      <div className="btn-area-header">
                        <a href="#contact" className="rts-btn btn-primary with-arrow">
                          Request Quote <i className="fa-regular fa-arrow-up-right"></i>
                        </a>
                      </div>
                      {/* button area end */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className={`header-nav-area header--sticky ${isSticky ? 'sticky' : ''}`}>
                      <div className="logo-md-sm-device">
                        <a href="#" className="logo">
                          <img src="/assets/images/logo/my_logo2.png" alt="logo" />
                        </a>
                      </div>

                      <div className="header-nav main-nav-one">
                        <nav>
                          <ul>
                            <li className="nav-item">
                              <a className="nav-link" href="#home">HOME</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#about">ABOUT</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#portfolio">PORTFOLIO</a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" href="#contact">CONTACT</a>
                            </li>
                            <li style={{ borderLeft: '1px solid #ccc', marginLeft: '35px' }}>
                              <a></a>
                            </li>
                            <li className="nav-item">
                              <a className="nav-link" style={{ fontSize: '22px' }} href={`tel:${CONFIG.PHONE}`}>
                                <i className="uil uil-phone"></i> {CONFIG.PHONE}
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                      <div className="actions-area">
                        <div className="menu-btn" id="menu-btn" onClick={() => setShowSidebar(true)}>
                          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="14" width="20" height="2" fill="#1F1F25" />
                            <rect y="7" width="20" height="2" fill="#1F1F25" />
                            <rect width="20" height="2" fill="#1F1F25" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* header style two End */}

      {/* banner area cleaning home start */}
      <div className="cleaning-home-banner-wrapper-one">
        <div className="swiper mySwiper-banner-cleaning">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              {/* cleaning home banner start */}
              <div className="main-cleaning-wrapper-main-swiper">
                <div className="shape-area-left">
                  <img className="full" src="/assets/images/banner/10.png" alt="shape-image" />
                  <img className="left-b" src="/assets/images/banner/11.png" alt="shape-image" />
                  <img className="left-t" src="/assets/images/banner/12.png" alt="shape-image" />
                  <img className="right-b" src="/assets/images/banner/09.png" alt="shape-image" />
                </div>
                <div className="banner-cleaning-area">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="banner-cleaning-content text-center">
                          <span className="pre">Every Fix Starts with Trust</span>
                          <h1 className="title">
                            Professional <br />
                            Handyman Services
                          </h1>
                          <a href={`tel:${CONFIG.PHONE}`} className="rts-btn btn-primary">
                            Call: {CONFIG.PHONE}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* cleaning home banner end */}
            </div>
          </div>
        </div>
      </div>
 
      {/* rts about area start */}
      <div id="about" className="rts-cleaning-home-about rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pr--70 pr_sm--0">
              <div className="cleaning-home-about-left-img">
                <div className="thumbnail">
                  <img src="/assets/images/about/17.jpg" alt="image-about" />
                  <div className="shape">
                    <img src="/assets/images/about/shape.png" alt="shape" />
                    <div className="inner-content">
                      <h6>7+</h6>
                      <p>Years Of Experience</p>
                    </div>
                  </div>
                </div>
                <div className="small-image images">
                  <img src="/assets/images/about/20.jpg" alt="images" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 pr--50 pt_sm--30">
              <div className="about-cleaning-right-content mt_md--30 mt_sm--30">
                <div className="title-area-left">
                  <p className="pre">
                    <span>Quality Handyman</span> Solution
                  </p>
                  <h2 className="title" style={{ fontSize: '39px' }}>
                    Handy&Man Handyman Services, where quality is our priority!
                  </h2>
                </div>
                <div className="inner-content-about-cleaning">
                  <p className="disc">
                    We&apos;re your trusted team of experienced professionals dedicated to attention to detail,
                    punctuality, and personalized solutions. We provide transparent pricing, ensuring your
                    satisfaction on every project.<br /><br />
                    Choose Handy&Man Handyman Services for reliable and exceptional service every time.
                  </p>
                  <div className="experience">
                    <img src="/assets/images/about/18.jpg" alt="about" />
                    <p className="exp">
                      We have a proven track of 7+ Years <br />
                      of delivering home improvement needs.
                    </p>
                  </div>
                  <div className="short-cta">
                    <div className="call">
                      <img src="/assets/images/about/call.png" alt="call" />
                      <div className="info">
                        <span>Call Directly 24/7</span>
                        <a href={`tel:${CONFIG.PHONE}`} className="number">{CONFIG.PHONE}</a>
                      </div>
                    </div>
                    <a href={`tel:${CONFIG.PHONE}`} className="rts-btn btn-primary">CLICK TO CALL</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rts about area end */}

      {/* done project area start */}
      <div id="services" className="done-project-area rts-section-gap"></div>
      {/* done project area end */}

      {/* rts team area cleanign home */}
      <div className="rts-cleaning-home-team rts-section-gapBottom bg-team-cleaning-home bg_image" style={{ paddingBottom: '0px' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cta-main-wrapper-cleaning bg_image mb--120">
                <div className="left-content">
                  <h2 className="title">
                    Looking for a professional service?<br />
                    No need to go any further
                  </h2>
                </div>
                <div className="button-area">
                  <a href={`tel:${CONFIG.PHONE}`} className="rts-btn btn-primary">Let&apos;s Work With Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rts team area cleanign home end */}

      {/* why choose us section start */}
      <div className="why-choose-us-section-cleaning rts-section-gap bg_image">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="why-choose-us-cleaing">
                <div className="title-area-left">
                  <p className="pre">
                    <span>Quality Handyman</span> Solution
                  </p>
                  <h2 className="title">
                    We Provides Qualitiful
                    Handyman Service
                  </h2>
                </div>
                <div className="inner-content">
                  <p className="disc">
                    Our team is dedicated to providing the best service, customer satisfaction, and quality
                    work. We are prompt, reliable, and always ready to help you with your home improvement
                    needs.
                  </p>
                  {/* service we provide area start */}
                  <div className="service-area-inner-short">
                    {/* single */}
                    <div className="single-c">
                      <div className="icon">
                        <i className="fa-regular fa-check"></i>
                      </div>
                      <p className="s_v">Best Service</p>
                    </div>
                    {/* single end */}
                    {/* single */}
                    <div className="single-c">
                      <div className="icon">
                        <i className="fa-regular fa-check"></i>
                      </div>
                      <p className="s_v">Customer Satisfaction</p>
                    </div>
                    {/* single end */}
                    {/* single */}
                    <div className="single-c">
                      <div className="icon">
                        <i className="fa-regular fa-check"></i>
                      </div>
                      <p className="s_v">Best Quality</p>
                    </div>
                    {/* single end */}
                    {/* single */}
                    <div className="single-c">
                      <div className="icon">
                        <i className="fa-regular fa-check"></i>
                      </div>
                      <p className="s_v">Prompt and Reliable</p>
                    </div>
                    {/* single end */}
                  </div>
                  {/* service we provide area end */}
                  <a href={`tel:${CONFIG.PHONE}`} className="rts-btn btn-primary">
                    Call: {CONFIG.PHONE}
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt_md--30 mt_sm--30">
              <div className="thumbnail-cleaning-choose-us">
                <div className="thumbnail">
                  <img src="/assets/images/service/13.jpg" alt="service" />
                </div>
                <div className="sm-img images">
                  <img src="/assets/images/service/14.jpg" alt="service" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt--150">
          <div className="row g-24">
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              {/* ingle counter area start */}
              <div className="single-counter-area-cleaning bg_image">
                <div className="icon">
                  <svg width="46" height="45" viewBox="0 0 46 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.372 11.8137H44.3718L44.3703 11.8122L41.4649 11.3977C41.0565 11.3396 40.7726 10.9613 40.8308 10.553C40.8587 10.3567 40.9635 10.1797 41.1221 10.0608L43.4703 8.29958C43.8004 8.05207 43.8672 7.58396 43.6197 7.25392L40.9309 3.6688C40.6834 3.33876 40.2152 3.27192 39.8852 3.51942L37.5377 5.28061C37.2091 5.52998 36.7406 5.46575 36.4912 5.13711C36.3701 4.97755 36.3182 4.77599 36.3471 4.57778L36.7624 1.67234C36.821 1.26397 36.5374 0.88557 36.1291 0.826939C36.1289 0.826939 36.1286 0.826846 36.1283 0.826846L31.6947 0.193474C31.2864 0.134843 30.9078 0.418291 30.8492 0.826659V0.826846L30.4339 3.73229C30.3758 4.14065 29.9976 4.42457 29.5892 4.3664C29.3929 4.33849 29.2159 4.23364 29.097 4.07511L27.3365 1.72686C27.089 1.39682 26.6209 1.32998 26.2909 1.57748L24.0464 3.26174C23.031 3.15381 22.007 3.15381 20.9916 3.26174C14.3418 4.0218 9.12702 9.32498 8.47881 15.9867C8.45864 16.198 8.45117 16.4079 8.44072 16.6178H8.21665C7.86224 16.6185 7.55704 16.8681 7.48618 17.2153L6.97007 19.6696L4.90265 18.2438C4.60595 18.0391 4.20524 18.0756 3.95036 18.3304L1.70966 20.5711C1.45515 20.8259 1.41874 21.2261 1.62302 21.5227L3.04212 23.5864L0.587065 24.1025C0.243678 24.1777 -0.000745193 24.4822 1.70707e-06 24.8337V27.8213C-0.000185018 28.1746 0.247319 28.4797 0.59304 28.5525L3.0481 29.0686L1.62899 31.1323C1.42471 31.4289 1.46112 31.8291 1.71563 32.0839L3.95633 34.3246C4.21121 34.5794 4.61192 34.6159 4.90863 34.4112L6.97231 32.9884L7.48842 35.4434C7.55928 35.7906 7.86448 36.0403 8.21889 36.0409H11.2065C11.5598 36.0411 11.8649 35.7936 11.9377 35.4479L12.4538 32.9928L14.5175 34.4119C14.8141 34.6162 15.2143 34.5798 15.469 34.3253L16.629 33.1616V35.2903C16.6323 36.3529 17.2016 37.3331 18.1228 37.8626V42.0124C18.1228 43.6624 19.4604 45 21.1104 45H24.098C25.748 45 27.0856 43.6624 27.0856 42.0124V37.8626C28.0068 37.3331 28.576 36.3529 28.5794 35.2903V32.3341C28.5996 31.0902 29.2504 29.9418 30.307 29.2852C30.9268 28.8831 31.5146 28.4336 32.0652 27.9408L31.0688 26.8279C30.5763 27.2693 30.0501 27.6716 29.4951 28.0312C28.012 28.962 27.1042 30.5832 27.0856 32.3341V35.2903C27.0856 36.1153 26.4168 36.7841 25.5918 36.7841H19.6166C18.7915 36.7841 18.1228 36.1153 18.1228 35.2903V32.2721C18.1055 30.5543 17.2119 28.9644 15.7536 28.0566C9.83378 24.3368 8.05018 16.5225 11.7699 10.6026C14.0779 6.92967 18.1057 4.69411 22.4436 4.67861C22.4325 4.70522 22.4227 4.73239 22.4145 4.76002C22.3867 4.95608 22.4381 5.15522 22.5571 5.31347L24.3176 7.66098C24.5032 7.9012 24.521 8.23114 24.3624 8.49004C24.2096 8.75052 23.9143 8.89262 23.6155 8.8493L20.71 8.43402C20.3017 8.37548 19.9233 8.65902 19.8646 9.0673C19.8646 9.06758 19.8646 9.06786 19.8646 9.06814L19.2304 13.504C19.1719 13.9123 19.4554 14.2907 19.8637 14.3494C19.864 14.3494 19.8643 14.3495 19.8646 14.3495L22.77 14.7647C23.1784 14.8229 23.4623 15.2011 23.4041 15.6095C23.3762 15.8057 23.2713 15.9828 23.1128 16.1017L20.7653 17.8621C20.4353 18.1096 20.3684 18.5778 20.6159 18.9078L23.3048 22.4929C23.5523 22.823 24.0204 22.8898 24.3504 22.6423L26.6987 20.8819C27.029 20.6348 27.4971 20.7023 27.7442 21.0327C27.8624 21.1908 27.9132 21.3893 27.8855 21.5847L27.471 24.4901C27.4123 24.8984 27.6958 25.277 28.1042 25.3356H28.1044L32.5409 25.9697C32.5759 25.9742 32.6111 25.9765 32.6463 25.9765C33.0181 25.9769 33.3336 25.7037 33.3864 25.3356L33.801 22.4302C33.8591 22.0218 34.2373 21.7379 34.6457 21.7961C34.8419 21.824 35.019 21.9288 35.1379 22.0874L36.8991 24.4349C37.1466 24.7649 37.6147 24.8317 37.9448 24.5842L41.5299 21.8954C41.8599 21.6479 41.9268 21.1798 41.6793 20.8497L39.9188 18.5022C39.7341 18.2616 39.7162 17.9323 39.874 17.6732C40.0235 17.4092 40.3215 17.2662 40.6209 17.3147L43.5263 17.7292C43.9346 17.7878 44.3132 17.5043 44.3718 17.096V17.0958L45.0052 12.6592C45.0638 12.2509 44.7804 11.8724 44.372 11.8137ZM19.6166 38.2779H25.5918V39.7717H19.6166V38.2779ZM19.6166 41.2655H25.5918V42.0124C25.5918 42.8374 24.923 43.5062 24.098 43.5062H21.1104C20.2853 43.5062 19.6166 42.8374 19.6166 42.0124V41.2655ZM13.6705 28.3852C14.0783 28.7187 14.5044 29.0292 14.947 29.3151C15.6527 29.7611 16.1839 30.4358 16.452 31.2264L14.8499 32.8255L13.2986 31.756C12.6192 31.2879 11.6891 31.4591 11.2209 32.1384C11.1086 32.3013 11.0298 32.4849 10.9891 32.6784L10.5978 34.5434H8.82238L8.43101 32.6814C8.26109 31.8741 7.46891 31.3573 6.6616 31.5272C6.46806 31.5679 6.28451 31.6467 6.12159 31.759L4.56954 32.8255L3.20868 31.4677L4.2775 29.9171C4.74608 29.2381 4.57542 28.3078 3.89639 27.8392C3.73338 27.7267 3.54964 27.6477 3.35582 27.6069L1.4938 27.2148V25.4402L3.35582 25.0481C4.16285 24.8769 4.6784 24.084 4.50726 23.2769C4.46665 23.0854 4.38888 22.9038 4.27824 22.7424L3.20868 21.1873L4.56954 19.8295L6.12234 20.899C6.80193 21.3667 7.7321 21.1949 8.19975 20.5153C8.31178 20.3526 8.3904 20.1692 8.43101 19.9759L8.56172 19.3544C8.68141 20.2151 8.87961 21.0628 9.15401 21.8872C6.69643 22.1802 4.94168 24.41 5.23465 26.8676C5.52762 29.3252 7.75749 31.0799 10.2151 30.787C11.6945 30.6105 12.9895 29.7104 13.6705 28.3852ZM12.5106 27.3328C11.9528 28.8831 10.244 29.6877 8.69373 29.1301C7.14345 28.5723 6.33885 26.8635 6.8965 25.3132C7.32317 24.1272 8.44921 23.3373 9.70961 23.3399C9.71932 23.3399 9.72828 23.3399 9.73799 23.3399C10.4249 24.8209 11.3629 26.1718 12.5106 27.3328ZM42.9945 16.1428L40.8285 15.8336C39.6034 15.6586 38.4685 16.51 38.2936 17.735C38.2095 18.3233 38.3626 18.9209 38.7193 19.3963L40.0316 21.1463L37.6415 22.9388L36.3285 21.1896C35.586 20.1995 34.1816 19.9986 33.1916 20.7411C32.7162 21.0975 32.4018 21.6283 32.3176 22.2166L32.0151 24.3856L29.0581 23.9628L29.3674 21.7968C29.5428 20.5718 28.6919 19.4365 27.4669 19.2612C26.8782 19.1769 26.2803 19.33 25.8046 19.6868L24.0547 20.9991L22.2621 18.609L24.0113 17.296C25.0014 16.5536 25.2023 15.1491 24.4599 14.1591C24.1034 13.6837 23.5726 13.3693 22.9844 13.2851L20.8183 12.9759L21.2411 10.0189L23.4071 10.3282C24.6321 10.5036 25.7674 9.65268 25.9427 8.42767C26.027 7.83902 25.8739 7.24113 25.5171 6.76545L24.2003 5.01397L26.5904 3.22141L27.9034 4.97139C28.6459 5.9615 30.0503 6.16232 31.0403 5.41991C31.5157 5.06345 31.8301 4.53268 31.9143 3.94441L32.2235 1.7784L35.1805 2.20039L34.8713 4.3664C34.6963 5.59151 35.5476 6.72642 36.7727 6.90138C37.361 6.98541 37.9586 6.83229 38.434 6.47565L40.184 5.16335L41.9765 7.55343L40.2265 8.86648C39.2364 9.60889 39.0356 11.0133 39.778 12.0034C40.1345 12.4788 40.6652 12.7931 41.2535 12.8773L43.4195 13.1865L42.9945 16.1428Z" fill="white" />
                    <path d="M32.1167 7.10529C28.8167 7.10529 26.1415 9.78049 26.1415 13.0805C26.1415 16.3805 28.8167 19.0557 32.1167 19.0557C35.4167 19.0557 38.0919 16.3805 38.0919 13.0805C38.0882 9.78199 35.4152 7.10893 32.1167 7.10529ZM32.1167 17.5619C29.6417 17.5619 27.6353 15.5555 27.6353 13.0805C27.6353 10.6054 29.6417 8.59909 32.1167 8.59909C34.5917 8.59909 36.5981 10.6054 36.5981 13.0805C36.5952 15.5543 34.5905 17.559 32.1167 17.5619Z" fill="white" />
                    <path d="M23.3511 33.0496H21.8573V35.2903H23.3511V33.0496Z" fill="white" />
                    <path d="M19.3372 25.7143C14.7265 23.9131 12.449 18.7153 14.2502 14.1046C14.9482 12.318 16.2008 10.8024 17.824 9.78068L17.0256 8.51693C12.1394 11.5952 10.6737 18.0517 13.7519 22.9379C14.9441 24.8302 16.7116 26.2905 18.795 27.1043C20.6391 27.8108 21.8568 29.581 21.8573 31.5558H23.3511C23.3534 28.9648 21.7567 26.6411 19.3372 25.7143Z" fill="white" />
                    <path d="M42.0236 27.8213H36.7953V29.3151H42.0236V27.8213Z" fill="white" />
                    <path d="M36.5266 31.7284L35.5704 32.876L40.0521 36.6099L41.0083 35.4622L36.5266 31.7284Z" fill="white" />
                    <path d="M33.8077 33.7965H32.3139V39.0248H33.8077V33.7965Z" fill="white" />
                    <path d="M6.73747 11.4114L0.762683 12.9049L1.12475 14.3534L7.09953 12.8598L6.73747 11.4114Z" fill="white" />
                    <path d="M2.87115 4.06059L2.00338 5.27549L7.23127 9.0096L8.09903 7.7947L2.87115 4.06059Z" fill="white" />
                    <path d="M9.8501 0L8.4029 0.370014L9.93051 6.34475L11.3777 5.97474L9.8501 0Z" fill="white" />
                  </svg>
                </div>
                <div className="content text-center">
                  <h2 className="title"><span className="counter">7</span>k+</h2>
                  <span className="detail">Project Completed<br /><br /></span>
                </div>
              </div>
              {/* ingle counter area end */}
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              {/* ingle counter area start */}
              <div className="single-counter-area-cleaning bg_image">
                <div className="icon">
                  <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.6236 10.5663C15.4943 10.9642 15.6216 11.3906 15.9477 11.6528L18.8511 13.9864L17.8739 17.5811C17.7642 17.9847 17.9119 18.4044 18.2506 18.6507C18.5893 18.8964 19.0339 18.9073 19.384 18.6782L22.5007 16.638L25.6175 18.6783C25.7855 18.7883 25.9753 18.8429 26.1647 18.8429C26.37 18.8429 26.5748 18.7787 26.7507 18.6507C27.0895 18.4047 27.2374 17.9847 27.1274 17.5811L26.1502 13.9865L29.0534 11.653C29.3798 11.3909 29.5071 10.9643 29.3777 10.5663C29.2484 10.1681 28.8947 9.89787 28.4768 9.87766L24.7561 9.69625L23.4339 6.21386C23.2855 5.82265 22.919 5.56979 22.5006 5.56979C22.0822 5.56979 21.7157 5.82257 21.5674 6.21377L20.2451 9.69634L16.5247 9.87766C16.1066 9.89787 15.7529 10.1681 15.6236 10.5663ZM20.5803 11.0878C20.9768 11.0685 21.3241 10.8162 21.4648 10.4451L22.5005 7.7174L23.5362 10.4453C23.6772 10.8163 24.0245 11.0685 24.4207 11.0878L27.3349 11.2299L25.0607 13.0578C24.7512 13.3066 24.6187 13.7149 24.7228 14.0977L25.4883 16.9132L23.047 15.315C22.881 15.2065 22.6907 15.1521 22.5004 15.1521C22.3101 15.1521 22.1197 15.2065 21.9536 15.3152L19.5125 16.9132L20.2779 14.0979C20.3822 13.7148 20.2495 13.3064 19.94 13.0578L17.6658 11.23L20.5803 11.0878ZM21.7974 3.28341V0.703124C21.7974 0.314824 22.1122 0 22.5005 0C22.8888 0 23.2036 0.314824 23.2036 0.703124V3.28341C23.2036 3.67171 22.8888 3.98654 22.5005 3.98654C22.1122 3.98654 21.7974 3.67171 21.7974 3.28341ZM26.0793 7.44924C25.8195 7.1607 25.8428 6.71606 26.1314 6.45626L29.0067 3.86718C29.2953 3.60729 29.7399 3.63058 29.9998 3.91921C30.2596 4.20776 30.2363 4.65239 29.9477 4.9122L27.0723 7.50128C26.9379 7.6223 26.7697 7.68189 26.602 7.68189C26.4098 7.68189 26.2182 7.60349 26.0793 7.44924ZM15.0013 3.91921C15.2611 3.63058 15.7056 3.60729 15.9943 3.86718L18.8698 6.45626C19.1583 6.71606 19.1816 7.1607 18.9218 7.44924C18.7829 7.6034 18.5913 7.68189 18.399 7.68189C18.2314 7.68189 18.0632 7.6223 17.9287 7.50128L15.0533 4.9122C14.7647 4.65239 14.7415 4.20776 15.0013 3.91921ZM31.5211 11.6528L34.4245 13.9864L33.4473 17.5811C33.3376 17.9847 33.4853 18.4044 33.824 18.6507C34.1624 18.8964 34.6072 18.9072 34.9574 18.6782L38.0741 16.638L41.1909 18.6783C41.3589 18.7883 41.5487 18.8429 41.7381 18.8429C41.9434 18.8429 42.1482 18.7787 42.3241 18.6507C42.6628 18.4049 42.8106 17.985 42.7008 17.5811L41.7236 13.9865L44.6268 11.653C44.9531 11.391 45.0804 10.9644 44.951 10.5663C44.8217 10.1681 44.468 9.89787 44.0502 9.87766L40.3295 9.69625L39.0074 6.21386C38.8589 5.82265 38.4925 5.56979 38.0741 5.56979C37.6556 5.56979 37.2891 5.82257 37.1407 6.21377L35.8186 9.69625L32.0981 9.87757C31.68 9.89778 31.3263 10.1681 31.197 10.5663C31.0676 10.9643 31.1949 11.3909 31.5211 11.6528ZM36.1536 11.0878C36.5502 11.0685 36.8976 10.8162 37.0384 10.445L38.074 7.71731L39.1095 10.4449C39.2504 10.8162 39.5978 11.0685 39.9942 11.0877L42.9084 11.2299L40.6344 13.0575C40.3248 13.3063 40.1921 13.7146 40.2963 14.0976L41.0617 16.9131L38.6205 15.315C38.4544 15.2064 38.2641 15.1521 38.0738 15.1521C37.8834 15.1521 37.6931 15.2065 37.5271 15.3151L35.086 16.9131L35.8514 14.0978C35.9556 13.7149 35.823 13.3066 35.5135 13.0577L33.2393 11.2299L36.1536 11.0878ZM0.374088 11.6528L3.27755 13.9864L2.3003 17.5811C2.19061 17.9847 2.33835 18.4044 2.67699 18.6507C3.01572 18.8964 3.46036 18.9073 3.81043 18.6782L6.92711 16.638L10.0439 18.6783C10.2119 18.7883 10.4017 18.8429 10.5911 18.8429C10.7964 18.8429 11.0013 18.7787 11.1771 18.6507C11.5158 18.4049 11.6636 17.985 11.5538 17.5811L10.5766 13.9865L13.4799 11.653C13.8059 11.3911 13.9333 10.9647 13.804 10.5658C13.6745 10.168 13.3208 9.89778 12.9032 9.87757L9.18256 9.69616L7.86042 6.21386C7.71198 5.82265 7.34556 5.56979 6.92711 5.56979C6.50858 5.56979 6.14216 5.82257 5.99372 6.21377L4.67158 9.69625L0.951177 9.87757C0.533082 9.89778 0.179411 10.1681 0.0502117 10.5658C-0.0794268 10.9641 0.0477507 11.3908 0.374088 11.6528ZM5.00662 11.0878C5.40327 11.0685 5.75061 10.8162 5.89141 10.445L6.92703 7.71731L7.96255 10.4449C8.10344 10.8162 8.45078 11.0685 8.84726 11.0877L11.7614 11.2299L9.48745 13.0575C9.17781 13.3063 9.0451 13.7146 9.14934 14.0976L9.91477 16.9131L7.47353 15.315C7.30742 15.2064 7.11713 15.1521 6.92685 15.1521C6.73648 15.1521 6.54611 15.2065 6.38008 15.3151L3.93901 16.9131L4.70445 14.0978C4.8086 13.7149 4.67606 13.3066 4.36651 13.0577L2.09235 11.2299L5.00662 11.0878ZM44.8898 37.3476C44.3951 35.7499 43.3818 34.3153 42.0364 33.3079C41.3924 32.8257 40.691 32.45 39.9512 32.1841C40.9769 31.379 41.6379 30.1292 41.6379 28.7271C41.6379 26.3043 39.6667 24.3333 37.244 24.3333C34.8213 24.3333 32.8501 26.3043 32.8501 28.7271C32.8501 30.1275 33.5095 31.3761 34.5332 32.1813C33.1612 32.671 31.9457 33.5314 31.0148 34.6909C30.5798 34.0822 30.0779 33.5169 29.5137 33.0067C28.377 31.9787 27.0429 31.2237 25.6061 30.7775C27.1297 29.7674 28.1369 28.038 28.1369 26.0771C28.1369 22.9693 25.6084 20.4409 22.5006 20.4409C19.3928 20.4409 16.8643 22.9693 16.8643 26.0771C16.8643 28.038 17.8714 29.7674 19.395 30.7775C17.9582 31.2236 16.6241 31.9787 15.4873 33.0067C14.9231 33.5169 14.4213 34.0822 13.9863 34.6908C13.0555 33.5313 11.84 32.6708 10.4679 32.181C11.4915 31.3758 12.151 30.1273 12.151 28.7268C12.151 26.304 10.1799 24.333 7.75715 24.333C5.33436 24.333 3.36324 26.304 3.36324 28.7268C3.36324 30.1288 4.02418 31.3787 5.04986 32.1838C4.31 32.4498 3.60863 32.8254 2.96448 33.3077C1.61914 34.315 0.605855 35.7496 0.11112 37.3472C-0.117483 38.0851 0.00916681 38.834 0.467691 39.4561C0.926128 40.0781 1.60412 40.4205 2.37667 40.4205H12.0967V41.6894C12.0967 43.5149 13.5818 45 15.4073 45H29.5937C31.4191 45 32.9043 43.5149 32.9044 41.6894V40.4208H42.6244C43.397 40.4208 44.075 40.0783 44.5333 39.4565C44.9918 38.8344 45.1184 38.0854 44.8898 37.3476ZM37.244 25.7395C38.8914 25.7395 40.2316 27.0798 40.2316 28.7271C40.2316 30.3745 38.8914 31.7147 37.244 31.7147C35.5966 31.7147 34.2564 30.3745 34.2564 28.7271C34.2564 27.0798 35.5966 25.7395 37.244 25.7395ZM18.2705 26.0771C18.2705 23.7447 20.1682 21.8471 22.5006 21.8471C24.833 21.8471 26.7307 23.7447 26.7307 26.0771C26.7307 28.4088 24.8343 30.3059 22.5029 30.3071C22.5021 30.3071 22.5012 30.3071 22.5005 30.3071C22.4998 30.3071 22.499 30.3071 22.4982 30.3071C20.1668 30.3058 18.2705 28.4087 18.2705 26.0771ZM7.75715 25.7392C9.40448 25.7392 10.7447 27.0794 10.7447 28.7267C10.7447 30.3742 9.40448 31.7144 7.75715 31.7144C6.10973 31.7144 4.76949 30.3742 4.76949 28.7267C4.76949 27.0794 6.10973 25.7392 7.75715 25.7392ZM12.1881 39.0141H2.37676C2.05315 39.0141 1.79176 38.8821 1.59972 38.6216C1.40759 38.3611 1.35881 38.0723 1.45453 37.7632C2.31445 34.9863 4.84736 33.1206 7.75715 33.1206C9.95819 33.1206 11.9632 34.1841 13.1964 35.9844C12.7089 36.9315 12.3674 37.9523 12.1881 39.0141ZM31.4981 41.6893C31.498 42.7394 30.6437 43.5937 29.5937 43.5937H15.4073C14.3573 43.5937 13.503 42.7394 13.503 41.6893V39.7555C14.0121 35.1687 17.8726 31.7145 22.4982 31.7133C22.499 31.7133 22.4998 31.7134 22.5006 31.7134C22.5014 31.7134 22.5022 31.7133 22.5029 31.7133C27.1285 31.7146 30.9889 35.1687 31.4981 39.7555V41.6893ZM43.4014 38.6221C43.2094 38.8825 42.9481 39.0145 42.6244 39.0145H32.8131C32.6337 37.9526 32.2922 36.9317 32.2922 36.9317L31.8048 35.9846C33.038 34.1844 35.043 33.121 37.244 33.121C40.1537 33.121 42.6867 34.9867 43.5466 37.7636C43.6423 38.0726 43.5934 38.3614 43.4014 38.6221Z" fill="white" />
                  </svg>
                </div>
                <div className="content text-center">
                  <h2 className="title"><span className="counter">4</span>k+</h2>
                  <span className="detail">Happy residentials<br /> customers</span>
                </div>
              </div>
              {/* ingle counter area end */}
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              {/* ingle counter area start */}
              <div className="single-counter-area-cleaning bg_image">
                <div className="icon">
                  <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M45 18.871H43.3691L40.9382 20.15C40.6646 19.999 40.3801 19.8711 40.0732 19.7942L37.0154 19.029V18.6814C38.3682 17.7372 39.1935 16.1775 39.1935 14.5161V13.2474C39.1935 10.4278 36.9842 8.06822 34.2688 7.986C34.131 7.98245 33.9952 7.98741 33.8588 7.99415L34.6516 6.13817L30.8081 2.29579L28.5425 3.77044C27.6816 3.28562 26.7712 2.90819 25.8257 2.64345L25.2661 0H19.7346L19.175 2.64416C18.2295 2.9089 17.3183 3.28633 16.4582 3.77115L14.1926 2.2965L10.3523 6.13675L11.1316 7.99415C11.1019 7.99273 11.0735 7.98741 11.0437 7.98671C9.65379 7.9463 8.34465 8.45345 7.35021 9.41883C6.35435 10.3835 5.80645 11.6781 5.80645 13.0645V14.5161C5.80645 16.1775 6.63113 17.7365 7.98387 18.6807V19.029L5.98932 19.5277L2.37411 17.4194H0V32.4589L7.1404 34.8387H8.53106L8.70472 34.2306L10.8935 35.5443C10.9293 36.7344 11.8837 37.692 13.0727 37.7338C13.1145 38.9178 14.066 39.8694 15.2501 39.9112C15.2919 41.0952 16.2435 42.0468 17.4275 42.0886C17.4707 43.3003 18.4631 44.2742 19.6847 44.2742C20.1383 44.2742 20.5831 44.1328 20.957 43.8808L21.5998 44.4486C22.0028 44.8033 22.5216 45 23.0603 45H23.1946C24.4024 45 25.3852 44.0236 25.4004 42.8197C26.5951 42.8045 27.5626 41.837 27.5778 40.6423C28.7732 40.6271 29.7414 39.6582 29.7552 38.4628C30.9616 38.4344 31.9355 37.4488 31.9355 36.2357C31.9355 36.1627 31.9319 36.0908 31.9245 36.0181L45 29.4809V18.871ZM37.7419 13.2474V14.5161C37.7419 15.8044 37.0459 17.0079 35.9253 17.6568L35.5624 17.8666L35.5652 20.1635L39.1914 21.0693L31.2097 25.2703V23.3151C31.2097 22.3395 30.8156 21.446 30.1702 20.7858L32.6613 20.1635V17.8648L32.2991 17.6554C31.1792 17.0079 30.4839 15.8044 30.4839 14.5161V13.0645C30.4839 12.0747 30.8751 11.149 31.5864 10.4597C32.297 9.77074 33.2397 9.39933 34.2252 9.43761C36.1642 9.49573 37.7419 11.205 37.7419 13.2474ZM23.5944 24.6997L20.3088 23.6497C18.8114 23.1698 17.1908 23.0982 15.658 23.4377L15.2419 23.5299V23.3151C15.2419 22.3143 15.9206 21.4453 16.8909 21.2022L21.0484 20.1635V17.8648L20.6862 17.6554C19.5663 17.0079 18.871 15.8044 18.871 14.5161V13.0645C18.871 12.0747 19.2622 11.149 19.9735 10.4597C20.6841 9.77074 21.6328 9.39933 22.6123 9.43761C24.5513 9.49573 26.129 11.205 26.129 13.2474V14.5161C26.129 15.8044 25.433 17.0079 24.3124 17.6568L23.9495 17.8666L23.9495 17.8666L23.9523 20.1635L28.1091 21.2022C29.0794 21.4453 29.7581 22.3143 29.7581 23.3151V26.0348L29.5787 26.129H29.134L24.6717 24.8539C24.3202 24.7543 23.958 24.7136 23.5944 24.6997ZM15.4046 10.863C16.7676 8.22203 19.511 6.53226 22.5 6.53226C25.4606 6.53226 28.1923 8.19934 29.5656 10.8045C29.2201 11.4974 29.0323 12.2646 29.0323 13.0645V14.5161C29.0323 16.1775 29.8569 17.7365 31.2097 18.6807V19.029L28.3064 19.7559L25.4025 19.029V18.6814C26.7553 17.7372 27.5806 16.1775 27.5806 14.5161V13.2474C27.5806 10.4278 25.3713 8.06822 22.6559 7.986C21.2667 7.94524 19.9568 8.45274 18.9624 9.41812C17.9673 10.3835 17.4194 11.6781 17.4194 13.0645V14.5161C17.4194 16.1775 18.244 17.7365 19.5968 18.6807V19.029L16.6935 19.7559L13.7896 19.029V18.6814C15.1423 17.7372 15.9677 16.1775 15.9677 14.5161V13.2474C15.9677 12.3933 15.7622 11.5824 15.4046 10.863ZM12.0665 6.47343L14.3854 4.1546L16.4263 5.48289L16.8169 5.24331C17.7954 4.64367 18.8529 4.20457 19.9597 3.93984L20.4062 3.83281L20.9112 1.45161H24.0895L24.5931 3.8321L25.0396 3.93878C26.1464 4.20387 27.2039 4.64296 28.1824 5.2426L28.573 5.48218L30.6139 4.15389L32.9299 6.47059L32.1067 8.39816C31.5464 8.63915 31.0268 8.97831 30.5746 9.4167C30.5448 9.44576 30.5193 9.47695 30.4902 9.50672C28.7803 6.78849 25.7573 5.08065 22.5 5.08065C19.2193 5.08065 16.1878 6.80444 14.4821 9.55031C14.0256 9.07258 13.4827 8.68558 12.8809 8.41517L12.0665 6.47343ZM9.43548 20.1635V17.8648L9.07329 17.6554C7.95339 17.0079 7.25806 15.8044 7.25806 14.5161V13.0645C7.25806 12.0747 7.64932 11.149 8.3606 10.4597C9.07116 9.77074 10.016 9.39933 10.9994 9.43761C12.9383 9.49573 14.5161 11.205 14.5161 13.2474V14.5161C14.5161 15.8044 13.8201 17.0079 12.6995 17.6568L12.3366 17.8666L12.3394 20.1635L14.8298 20.7858C14.1844 21.446 13.7903 22.3395 13.7903 23.3151V23.8527L11.5264 24.356L11.5853 24.1504L11.6129 22.809L7.78505 20.576L9.43548 20.1635ZM1.45161 18.871H1.98073L7.20065 21.9156L4.56677 32.4508L1.45161 31.412V18.871ZM7.37572 33.3871L5.94715 32.9111L8.5059 22.6772L10.1613 23.6426V23.8499L7.43668 33.3871H7.37572ZM12.3387 35.4766C12.3387 35.2626 12.4252 35.0528 12.5769 34.9011L13.8527 33.6253C14.0044 33.4736 14.2142 33.3871 14.4282 33.3871C14.8769 33.3871 15.2419 33.7521 15.2419 34.2008C15.2419 34.4148 15.1555 34.6247 15.0038 34.7763L13.7279 36.0522C13.5763 36.2038 13.3665 36.2903 13.1524 36.2903C12.7037 36.2903 12.3387 35.9253 12.3387 35.4766ZM14.5161 37.654C14.5161 37.44 14.6026 37.2302 14.7543 37.0785L16.0301 35.8027C16.1818 35.651 16.3916 35.5645 16.6057 35.5645C17.0543 35.5645 17.4194 35.9295 17.4194 36.3782C17.4194 36.5923 17.3329 36.8021 17.1812 36.9538L15.9054 38.2296C15.7537 38.3813 15.5439 38.4677 15.3298 38.4677C14.8812 38.4677 14.5161 38.1027 14.5161 37.654ZM16.6935 39.8315C16.6935 39.6174 16.78 39.4076 16.9317 39.2559L18.2075 37.9801C18.3592 37.8284 18.569 37.7419 18.7831 37.7419C19.2317 37.7419 19.5968 38.107 19.5968 38.5556C19.5968 38.7697 19.5103 38.9795 19.3586 39.1312L18.0828 40.407C17.9311 40.5587 17.7213 40.6452 17.5072 40.6452C17.0586 40.6452 16.6935 40.2801 16.6935 39.8315ZM19.6847 42.8226C19.236 42.8226 18.871 42.4575 18.871 42.0089C18.871 41.7948 18.9574 41.585 19.1091 41.4333L20.385 40.1575C20.5366 40.0058 20.7464 39.9194 20.9605 39.9194C21.4092 39.9194 21.7742 40.2844 21.7742 40.733C21.7742 40.9471 21.6877 41.1569 21.536 41.3086L20.2602 42.5844C20.1085 42.7361 19.8987 42.8226 19.6847 42.8226ZM23.1946 43.5484H23.0603C22.8753 43.5484 22.6981 43.481 22.5602 43.3588L22.0173 42.88L22.5624 42.3349C22.7569 42.1404 22.9079 41.9089 23.0195 41.6605L23.6794 42.2098C23.852 42.3537 23.9516 42.5656 23.9516 42.7914C23.9516 43.2089 23.6121 43.5484 23.1946 43.5484ZM29.7035 37.0161H29.578C29.3959 37.0161 29.218 36.9516 29.0787 36.8347L25.1427 33.5547L24.2128 34.6704L28.035 37.855C28.2069 37.9989 28.3064 38.2108 28.3064 38.4366C28.3064 38.854 27.9669 39.1935 27.5495 39.1935H27.391C27.2149 39.1935 27.0427 39.1312 26.9069 39.0178L22.9646 35.7329L22.0347 36.8485L25.8569 40.0335C26.0294 40.1763 26.129 40.3882 26.129 40.614C26.129 41.0315 25.7895 41.371 25.372 41.371C25.0935 41.371 24.822 41.2721 24.6083 41.0945L22.9884 39.7443C22.6315 39.0149 21.8982 38.5064 21.0395 38.4759C20.9977 37.2918 20.0461 36.3403 18.8621 36.2985C18.8203 35.1144 17.8687 34.1629 16.6847 34.1211C16.6422 32.9094 15.6498 31.9355 14.4282 31.9355C13.8318 31.9355 13.2481 32.1772 12.8264 32.5989L11.5505 33.8747C11.4743 33.9509 11.4113 34.0374 11.3471 34.1232L9.11759 32.7853L11.0721 25.9447L15.972 24.8553C17.2574 24.5679 18.6126 24.6303 19.8661 25.0315L20.9353 25.3735L17.3106 27.1858C16.4823 27.6008 15.9677 28.434 15.9677 29.3604V29.504C15.9677 30.8446 17.0586 31.9355 18.3993 31.9355C18.8398 31.9355 19.2732 31.8157 19.6499 31.5885L22.3526 29.9679C22.8955 29.6425 23.6241 29.7138 24.093 30.1355L30.2255 35.6545C30.3896 35.8034 30.4839 36.0146 30.4839 36.2357C30.4839 36.6663 30.1341 37.0161 29.7035 37.0161ZM43.5484 28.5836L31.3206 34.698C31.2809 34.6558 31.2394 34.6158 31.1959 34.5768L25.0644 29.0578C24.5272 28.573 23.8325 28.3064 23.1089 28.3064C22.5797 28.3064 22.0602 28.4503 21.6051 28.7232L18.9014 30.3446C18.7498 30.436 18.5765 30.4839 18.3993 30.4839C17.8585 30.4839 17.4194 30.0448 17.4194 29.504V29.3604C17.4194 28.9865 17.627 28.6513 17.9609 28.4844L22.0095 26.46C22.7024 26.1131 23.5249 26.0355 24.2716 26.2502L28.8327 27.553L29.9374 27.5806L43.5484 20.4168V28.5836Z" fill="white" />
                  </svg>
                </div>
                <div className="content text-center">
                  <h2 className="title"><span className="counter">300</span>+</h2>
                  <span className="detail">Commercial customers<br /><br /></span>
                </div>
              </div>
              {/* ingle counter area end */}
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12">
              {/* ingle counter area start */}
              <div className="single-counter-area-cleaning bg_image">
                <div className="icon">
                  <svg width="33" height="45" viewBox="0 0 33 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.9758 13.8902C31.6785 13.4761 31.4411 13.0222 31.2704 12.5419C31.1716 12.0194 31.1472 11.4855 31.198 10.9562C31.3217 10.033 31.1804 9.09371 30.7907 8.24774C30.2477 7.48044 29.4972 6.88388 28.6271 6.52801C28.1507 6.31226 27.7073 6.02989 27.3103 5.68937C26.97 5.29216 26.6877 4.84879 26.4717 4.37246C26.1159 3.50217 25.5193 2.75137 24.7519 2.20813C23.9062 1.81933 22.9676 1.67837 22.045 1.80163C21.5154 1.85239 20.9813 1.828 20.4585 1.72918C19.9779 1.55881 19.5237 1.32147 19.1094 1.02419C18.3557 0.439839 17.4499 0.0843425 16.4998 0C15.5497 0.0841851 14.6438 0.43958 13.8899 1.02389C13.4757 1.321 13.0218 1.55833 12.5415 1.72888C12.0189 1.82691 11.4852 1.8513 10.9558 1.80133C10.0327 1.6779 9.09341 1.81913 8.24737 2.20858C7.48016 2.75172 6.88373 3.50236 6.52801 4.37246C6.31226 4.84892 6.02989 5.2923 5.68937 5.68929C5.29217 6.0296 4.8488 6.31197 4.37246 6.52801C3.50217 6.8838 2.75137 7.48036 2.20813 8.24774C1.81938 9.09346 1.67843 10.0321 1.80163 10.9547C1.85241 11.4843 1.82802 12.0184 1.72918 12.5412C1.55869 13.0218 1.32123 13.476 1.02381 13.8902C0.439598 14.6441 0.0842336 15.5499 0 16.4998C0.0841851 17.45 0.43958 18.3559 1.02389 19.1098C1.32114 19.5239 1.55859 19.9778 1.72926 20.4581C1.82806 20.9807 1.85245 21.5145 1.80171 22.0439C1.67801 22.967 1.81925 23.9063 2.20895 24.7523C2.75196 25.5196 3.50249 26.1162 4.37253 26.472C4.84899 26.6878 5.29237 26.9702 5.68937 27.3107C6.02961 27.7078 6.31196 28.151 6.52801 28.6272C6.7396 29.0553 6.98314 29.4669 7.25655 29.8584L3.04534 41.4284C2.99708 41.5611 2.9873 41.7048 3.01712 41.8429C3.04693 41.981 3.11514 42.1079 3.21389 42.2089C3.31263 42.3099 3.4379 42.381 3.57526 42.4139C3.71263 42.4469 3.85651 42.4404 3.99034 42.3951L7.971 41.0505L10.1565 44.64C10.2235 44.7499 10.3176 44.8408 10.4299 44.9039C10.5421 44.9669 10.6687 45 10.7974 45C10.8216 45 10.8465 44.9985 10.8714 44.9963C11.012 44.9824 11.1458 44.9291 11.1458 44.9291L11.2574 44.8424C11.369 44.7557 11.4537 44.6392 11.502 44.5064L15.7294 32.8934C16.2333 33.0357 16.7667 33.0357 17.2706 32.8934L21.498 44.5064C21.5462 44.6392 21.631 44.7557 21.7426 44.8424C21.8542 44.9291 21.988 44.9824 22.1286 44.9963C22.1535 44.9985 22.1784 45 22.2026 45C22.3313 45 22.4579 44.9669 22.5701 44.9039C22.6823 44.8408 22.7765 44.7499 22.8434 44.64L25.029 41.0505L29.0097 42.3951C29.1435 42.4403 29.2874 42.4468 29.4248 42.4138C29.5621 42.3809 29.6874 42.3098 29.7862 42.2088C29.8849 42.1078 29.9531 41.9809 29.9829 41.8428C30.0127 41.7048 30.003 41.5611 29.9547 41.4283L25.7432 29.8578C26.0164 29.4669 26.2599 29.055 26.4717 28.6271C26.6874 28.1507 26.9698 27.7073 27.3103 27.3103C27.7075 26.97 28.1509 26.6877 28.6272 26.4717C29.4975 26.1159 30.2483 25.5193 30.7915 24.7519C31.1803 23.9062 31.3212 22.9676 31.198 22.045C31.1473 21.5154 31.1716 20.9813 31.2705 20.4585C31.441 19.9779 31.6784 19.5237 31.9759 19.1094C32.5601 18.3556 32.9154 17.4498 32.9997 16.4998C32.9154 15.5498 32.56 14.6441 31.9758 13.8902ZM10.6266 42.5269L8.94059 39.7576C8.85192 39.6121 8.71635 39.5012 8.5562 39.443C8.39605 39.3848 8.22087 39.3829 8.05949 39.4376L4.9885 40.4747L8.47252 30.902C9.26549 31.1934 10.1157 31.2948 10.955 31.198C11.4846 31.1476 12.0186 31.172 12.5414 31.2704C13.0221 31.4409 13.4763 31.6784 13.8905 31.9758C14.0427 32.0726 14.2002 32.1715 14.361 32.2683L10.6266 42.5269ZM24.9402 39.4376C24.7788 39.3829 24.6036 39.3848 24.4435 39.443C24.2833 39.5012 24.1478 39.6121 24.0591 39.7576L22.3731 42.5269L18.639 32.2687C18.7998 32.1712 18.9573 32.0726 19.1094 31.9758C19.5235 31.6785 19.9774 31.4411 20.4578 31.2704C20.9803 31.172 21.5141 31.1476 22.0435 31.198C22.8832 31.198 22.8832 31.198 23.047 31.198L24.5272 30.9013L28.0112 40.4747L24.9402 39.4376ZM30.7102 18.3038C30.3262 18.8444 30.0266 19.4404 29.8217 20.0711C29.6786 20.739 29.6371 21.4247 29.6987 22.105C29.7934 22.7443 29.7226 23.3972 29.4929 24.0013C29.0802 24.5097 28.543 24.9028 27.9335 25.1423C27.3193 25.4238 26.7515 25.7972 26.2497 26.2497C25.7967 26.7513 25.4231 27.3191 25.1416 27.9335C24.9021 28.543 24.509 29.0802 24.0005 29.4929C23.3963 29.722 22.7436 29.7928 22.1043 29.6987C21.424 29.6375 20.7383 29.679 20.0703 29.8217C19.4399 30.0267 18.8443 30.3263 18.3038 30.7102C17.7821 31.1269 17.16 31.3992 16.4998 31.4997C15.8397 31.3992 15.2176 31.1269 14.6959 30.7102C14.1552 30.3261 13.5593 30.0266 12.9286 29.8217C12.5077 29.7182 12.0751 29.6703 11.6418 29.6792C11.3913 29.6792 11.1415 29.6894 10.8947 29.699C10.2554 29.7933 9.60257 29.7225 8.99841 29.4932C8.48995 29.0805 8.09687 28.5433 7.85737 27.9338C7.57591 27.3195 7.20247 26.7516 6.74993 26.2497C6.24839 25.7967 5.68057 25.4231 5.06612 25.1416C4.45664 24.9021 3.91947 24.509 3.50682 24.0005C3.27716 23.3964 3.2063 22.7436 3.30102 22.1043C3.36255 21.424 3.32106 20.7383 3.17794 20.0703C2.97293 19.4399 2.67337 18.8443 2.2895 18.3038C1.87275 17.7821 1.60048 17.16 1.49999 16.4998C1.60048 15.8397 1.87275 15.2176 2.2895 14.6959C2.67352 14.1552 2.97309 13.5593 3.17794 12.9286C3.32108 12.2607 3.36257 11.575 3.30102 10.8947C3.20624 10.2554 3.2771 9.60248 3.50682 8.99841C3.91948 8.48995 4.45665 8.09687 5.06612 7.85737C5.68038 7.57588 6.24816 7.20245 6.74993 6.74993C7.20293 6.24839 7.57661 5.68057 7.85805 5.06612C8.09757 4.45664 8.49067 3.91947 8.99916 3.50681C9.60325 3.27729 10.2561 3.20644 10.8954 3.30102C11.5757 3.36215 12.2614 3.32067 12.9293 3.17794C13.5598 2.97293 14.1554 2.67337 14.6959 2.2895C15.2176 1.87275 15.8397 1.60048 16.4998 1.49998C17.16 1.60048 17.7821 1.87275 18.3038 2.2895C18.8444 2.67352 19.4404 2.97309 20.0711 3.17794C20.739 3.32067 21.4247 3.36216 22.105 3.30102C22.7443 3.20628 23.3972 3.27714 24.0013 3.50681C24.5097 3.91948 24.9028 4.45665 25.1423 5.06612C25.4238 5.68038 25.7972 6.24816 26.2497 6.74993C26.7513 7.20293 27.3191 7.57661 27.9335 7.85805C28.543 8.09757 29.0802 8.49067 29.4929 8.99916C29.7225 9.60322 29.7934 10.2561 29.6987 10.8954C29.6371 11.5757 29.6786 12.2614 29.8217 12.9293C30.0267 13.5598 30.3263 14.1554 30.7102 14.6959C31.1269 15.2176 31.3992 15.8397 31.4997 16.4998C31.3992 17.16 31.1269 17.7821 30.7102 18.3038Z" fill="white" />
                    <path d="M16.4998 4.49996C14.1265 4.49996 11.8064 5.20374 9.83306 6.5223C7.85969 7.84086 6.32163 9.71499 5.41339 11.9077C4.50515 14.1004 4.26751 16.5131 4.73053 18.8409C5.19355 21.1686 6.33642 23.3068 8.01464 24.985C9.69285 26.6632 11.831 27.8061 14.1588 28.2691C16.4865 28.7322 18.8993 28.4945 21.092 27.5863C23.2847 26.678 25.1588 25.14 26.4774 23.1666C27.7959 21.1932 28.4997 18.8732 28.4997 16.4998C28.4961 13.3184 27.2306 10.2683 24.981 8.01865C22.7314 5.76902 19.6813 4.50359 16.4998 4.49996ZM16.4998 26.9997C14.4232 26.9997 12.3931 26.3839 10.6664 25.2302C8.93971 24.0764 7.59391 22.4366 6.7992 20.518C6.00449 18.5994 5.79655 16.4882 6.20169 14.4514C6.60683 12.4146 7.60685 10.5437 9.07529 9.07529C10.5437 7.60685 12.4146 6.60683 14.4514 6.20169C16.4882 5.79655 18.5994 6.00448 20.518 6.7992C22.4366 7.59391 24.0764 8.93971 25.2302 10.6664C26.3839 12.3931 26.9997 14.4232 26.9997 16.4998C26.9966 19.2836 25.8894 21.9525 23.9209 23.9209C21.9525 25.8893 19.2836 26.9966 16.4998 26.9997Z" fill="white" />
                    <path d="M19.1907 12.7579L17.1722 8.66811C17.1033 8.55099 17.0051 8.4539 16.8871 8.38643C16.7692 8.31897 16.6357 8.28348 16.4998 8.28348C16.364 8.28348 16.2305 8.31897 16.1125 8.38643C15.9946 8.4539 15.8963 8.55099 15.8275 8.66811L13.8089 12.7579L9.29511 13.4141C9.15668 13.4343 9.02664 13.4927 8.91968 13.5829C8.81272 13.673 8.73311 13.7913 8.68983 13.9243C8.64656 14.0573 8.64135 14.1998 8.67479 14.3356C8.70823 14.4715 8.779 14.5952 8.87909 14.693L12.1456 17.8767L11.3744 22.3731C11.3508 22.511 11.3662 22.6528 11.419 22.7824C11.4718 22.912 11.5597 23.0243 11.673 23.1065C11.7862 23.1887 11.9202 23.2376 12.0598 23.2477C12.1993 23.2577 12.3389 23.2285 12.4628 23.1634L16.4998 21.0408L20.5369 23.1633C20.6607 23.2284 20.8003 23.2576 20.9399 23.2476C21.0795 23.2375 21.2135 23.1886 21.3267 23.1064C21.4399 23.0242 21.5279 22.9119 21.5807 22.7823C21.6334 22.6527 21.6489 22.511 21.6253 22.373L20.8541 17.8767L24.1206 14.6929C24.2207 14.5952 24.2914 14.4714 24.3249 14.3356C24.3583 14.1997 24.3531 14.0573 24.3098 13.9242C24.2666 13.7912 24.187 13.6729 24.08 13.5828C23.973 13.4926 23.843 13.4342 23.7046 13.4141L19.1907 12.7579ZM19.5247 17.0785C19.4377 17.1633 19.3727 17.2681 19.3352 17.3837C19.2977 17.4992 19.2888 17.6222 19.3094 17.742L19.8902 21.1287L16.8492 19.5298C16.7415 19.4731 16.6216 19.4434 16.4998 19.4434C16.3781 19.4434 16.2582 19.4731 16.1505 19.5298L13.1099 21.1287L13.6907 17.742C13.7112 17.6222 13.7023 17.4992 13.6648 17.3837C13.6273 17.2681 13.5623 17.1633 13.4753 17.0785L11.0144 14.6798L14.415 14.1854C14.5354 14.1681 14.6497 14.1216 14.7481 14.0502C14.8465 13.9787 14.926 13.8843 14.9798 13.7753L16.4998 10.6949L18.0203 13.7754C18.0741 13.8845 18.1536 13.9788 18.252 14.0503C18.3504 14.1218 18.4647 14.1682 18.585 14.1856L21.9857 14.6799L19.5247 17.0785Z" fill="white" />
                  </svg>
                </div>
                <div className="content text-center">
                  <h2 className="title"><span className="counter">100</span>%</h2>
                  <span className="detail">Satisfaction guarantee<br /><br /></span>
                </div>
              </div>
              {/* ingle counter area end */}
            </div>
          </div>
        </div>
      </div>
      {/* why choose us section end */}

      {/* rts contact form area start  */}
      <div id="contact" className="rts-contact-wrapper-form-area rts-section-gapBottom">
        <div className="container">
          <div className="row g-24">
            <div className="col-lg-7 col-md-12 col-sm-12 col-12">
              <div className="form--area">
                <div className="title-area-left">
                  <p className="pre">
                    <span>Feel Free</span> To Contact Us
                  </p>
                  <h2 className="title">Let’s Get in Touch</h2>
                </div>
                <form onSubmit={handleFormSubmit} className="contact-page-form mt--30">
                  <input
                    type="text"
                    name="honeypot"
                    id="honeypot"
                    style={{ display: 'none' }}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                  <div className="name-email-wraper">
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone number"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <textarea
                    placeholder="Type Your Message"
                    required
                    name="desc"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                  <button type="submit" className="rts-btn btn-primary">Send Message</button>
                </form>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-12">
              <div className="map-area-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75560.1072372733!2d-96.77299990554941!3d33.179566174398246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xff7d737e3643d1d%3A0xad0f2bb0a2b6268f!2sBVLine%20handyman!5e0!3m2!1sen!2sus!4v1707140230468!5m2!1sen!2sus"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* rts contact form area end  */}

      {/* sidebar Menu */}
      <div id="side-bar" className={`side-bar header-two ${showSidebar ? 'show' : ''}`}>
        <button className="close-icon-menu" onClick={() => setShowSidebar(false)}>
          <i className="far fa-times"></i>
        </button>
        {/* inner menu area desktop start */}
        <div className="inner-main-wrapper-desk">
          <div className="thumbnail">
            <img src="/assets/images/about/17.jpg" alt="elevate" />
          </div>
          <div className="inner-content">
            <h4 className="title">We Build Building and Great Constructive Homes.</h4>
            <p className="disc">
              We successfully cope with tasks of varying complexity, provide long-term guarantees and regularly
              master new technologies.
            </p>
            <div className="footer">
              <h4 className="title">Got a project in mind?</h4>
              <a href={`tel:${CONFIG.PHONE}`} className="rts-btn btn-primary">Let&apos;s talk</a>
            </div>
          </div>
        </div>
        {/* mobile menu area start */}
        <div className="mobile-menu-main">
          <nav className="nav-main mainmenu-nav mt--30">
            <ul className="mainmenu metismenu" id="mobile-menu-active">
              <li><a href="#home" className="main" onClick={() => setShowSidebar(false)}>Home</a></li>
              <li><a href="#about" className="main" onClick={() => setShowSidebar(false)}>About</a></li>
              <li><a href="#services" className="main" onClick={() => setShowSidebar(false)}>Services</a></li>
              <li><a href="#portfolio" className="main" onClick={() => setShowSidebar(false)}>Portfolio</a></li>
              <li><a href="#blog" className="main" onClick={() => setShowSidebar(false)}>Blog</a></li>
              <li><a href="#contact" className="main" onClick={() => setShowSidebar(false)}>Contact Us</a></li>
            </ul>
          </nav>

          <div className="rts-social-style-one pl--20 mt--100">
            <ul>
              <li>
                <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa-brands fa-twitter"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa-brands fa-youtube"></i></a>
              </li>
              <li>
                <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
              </li>
            </ul>
          </div>
        </div>
        {/* mobile menu area end */}
      </div>

      {/* Anywhere home backdrop for sidebar */}
      <div
        id="anywhere-home"
        className={showSidebar ? 'bgshow' : ''}
        onClick={() => setShowSidebar(false)}
      ></div>

      {/* Footer style two */}
      <div className="rts-footer-one footer-bg-one mt--160 pb--85">
        <div className="container">
          <div className="row g-0 bg-cta-footer-one">
            <div className="col-lg-12">
              <div className="bg-cta-footer-one wrapper">
                <div className="row align-items-center">
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <a href="#" className="logo-area-footer">
                      <img src="/assets/images/logo/my_logo2.png" alt="logo" />
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div className="single-cta-area">
                      <div className="icon">
                        <i className="fa-solid fa-phone"></i>
                      </div>
                      <div className="contact-info">
                        <p>Phone Number</p>
                        <a href={`tel:${CONFIG.PHONE}`}>{CONFIG.PHONE}</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div className="single-cta-area">
                      <div className="icon">
                        <i className="fa-solid fa-envelope"></i>
                      </div>
                      <div className="contact-info">
                        <p>Email Us Here</p>
                        <a href={`mailto:${CONFIG.EMAIL}`}>{CONFIG.EMAIL}</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-12">
                    <div className="single-cta-area last">
                      <div className="icon">
                        <i className="fa-regular fa-location-dot"></i>
                      </div>
                      <div className="contact-info">
                        <p>Office Address</p>
                        <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
                          {CONFIG.ADDRESS}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row pt--90">
            <div className="col-lg-12">
              <div className="single-footer-one-wrapper">
                <div className="single-footer-component first">
                  <div className="title-area">
                    <h5 className="title">About Company</h5>
                  </div>
                  <div className="body">
                    <p className="disc">
                      Centric applications productize before front end vortals visualize front end is
                      results and value added
                    </p>
                  </div>
                </div>
                <div className="single-footer-component">
                  <div className="title-area">
                    <h5 className="title">We accept</h5>
                  </div>
                  <div className="body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright-footer-one">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrapper">
                <p>Copyright 2023. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* progress area start */}
      <div className={`progress-wrap ${showScrollTop ? 'active-progress' : ''}`} onClick={handleScrollToTop}>
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path
            d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
            style={{
              transition: 'stroke-dashoffset 10ms linear 0s',
              strokeDasharray: '307.919, 307.919',
              strokeDashoffset: `${307.919 - 307.919 * scrollProgress}`,
            }}
          ></path>
        </svg>
      </div>
      {/* progress area end */}

      {/* Modal - Loading */}
      {formStatus === 'loading' && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 flex flex-col items-center max-w-xs w-full shadow-2xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-500/20 border-t-emerald-600 mb-4"></div>
            <h5 className="text-zinc-900 dark:text-zinc-50 font-bold text-lg mb-1">Sending Request</h5>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Please wait a moment...</p>
          </div>
        </div>
      )}

      {/* Modal - Success */}
      {formStatus === 'success' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setFormStatus('idle')}
        >
          <div
            className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center transform scale-100 transition-transform duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600"></div>
            
            {/* Success Icon with glowing background */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 mb-6 relative">
              <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping duration-1000"></span>
              <svg className="h-10 w-10 relative z-10" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            
            {/* Modal Heading */}
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-3 tracking-tight">
              Request Sent Successfully!
            </h3>
            
            {/* Modal Subtext */}
            <p className="text-zinc-600 dark:text-zinc-400 text-base mb-8 leading-relaxed max-w-sm mx-auto">
              Your message has been sent to our handyman team. We will review your request and get back to you shortly.
            </p>
            
            {/* Action button */}
            <button
              onClick={() => setFormStatus('idle')}
              style={{ backgroundColor: '#059669', color: '#ffffff', border: 'none' }}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-lg shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Great, thanks!
            </button>
            
            {/* Close button icon in top right */}
            <button
              onClick={() => setFormStatus('idle')}
              style={{ background: 'transparent', border: 'none' }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Modal - Error */}
      {formStatus === 'error' && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setFormStatus('idle')}
        >
          <div
            className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center transform scale-100 transition-transform duration-300 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-400 via-red-500 to-rose-600"></div>
            
            {/* Error Icon with glowing background */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500 mb-6 relative">
              <span className="absolute inset-0 rounded-full bg-rose-400/20 animate-pulse"></span>
              <svg className="h-10 w-10 relative z-10" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            
            {/* Modal Heading */}
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-3 tracking-tight">
              Submission Failed
            </h3>
            
            {/* Modal Subtext */}
            <p className="text-zinc-600 dark:text-zinc-400 text-base mb-8 leading-relaxed max-w-sm mx-auto">
              We encountered an issue while sending your request. Please check your internet connection and try again.
            </p>
            
            {/* Action button */}
            <button
              onClick={() => setFormStatus('idle')}
              style={{ backgroundColor: '#18181b', color: '#ffffff', border: 'none' }}
              className="w-full py-4 px-6 rounded-2xl bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-950 text-white font-bold text-lg shadow-lg shadow-zinc-800/10 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              Try again
            </button>
            
            {/* Close button icon in top right */}
            <button
              onClick={() => setFormStatus('idle')}
              style={{ background: 'transparent', border: 'none' }}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
