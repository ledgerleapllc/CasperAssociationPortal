import React from 'react';
import { LoadingScreen } from '../../components/hoc/loading-screen';
import LandingHeader from '../../components/layouts/landing-header';
import LandingFooter from '../../components/layouts/landing-footer';

const FAQ = () => {
  const CODE = `/* Slide In From The Top Option */

.header-2 {
  transform: translatey(-80px);
  -moz-transition: all .3s ease!important;
  -webkit-transition: all .3s ease!important;
  transition: all .3s ease!important;
}


.elementor-sticky—effects.header-2 {
  height: auto!important;
  transform: translatey(0px);
}


.elementor-sticky--effects.header-1 {
  display: none!important;
}

/* End Of Slide In From The Top Option */`;

  return (
    <div
      id="landing-page__faq"
      className="text-white min-h-screen overflow-x-hidden landing-page"
    >
      <LandingHeader />
      <section id="landing-page__faqTitle" className="text-center">
        <h1 className="font-medium">Frequently Asked Questions (FAQ)</h1>
      </section>
      <section id="landing-page__faqBody" className="bg-white">
        <div className="custom-container text-black">
          <div id="landing-page__faqGhost" />
          <div id="landing-page__faqContent">
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>How do I register for the Casper Members Portal?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>
                    Registration is easy and typically takes less than 10min. To
                    get started lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Libero volutpat sed cras ornare arcu
                    dui.
                  </p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>
                  What does a question look like that needs video or code
                  displayed visually?
                </p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>
                    Vulputate mi sit amet mauris commodo. Nulla aliquet
                    porttitor lacus luctus accumsan tortor. Leo vel fringilla
                    est ullamcorper eget nulla facilisi etiam. Quam id leo in
                    vitae turpis massa. Leo a diam sollicitudin tempor id eu.
                    Erat imperdiet sed euismod nisi porta. In est ante in nibh.
                    Semper viverra nam libero justo laoreet sit amet.
                  </p>
                  <div className="c-video-wrap mt-5 mb-5">
                    <div className="c-video">
                      <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/2WB6RcY0MPc?controls=0&showinfo=0"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                  <p className="mb-5">What about a code snippet?</p>
                  <pre>
                    <code>{CODE}</code>
                  </pre>
                  <p className="mt-5">
                    Vulputate mi sit amet mauris commodo. Nulla aliquet
                    porttitor lacus luctus accumsan tortor. Leo vel fringilla
                    est ullamcorper eget nulla facilisi etiam. Quam id leo in
                    vitae turpis massa. Leo a diam sollicitudin tempor id eu.
                    Erat imperdiet sed euismod nisi porta. In est ante in nibh.
                    Semper viverra nam libero justo laoreet sit amet.
                  </p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>Another Question?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>
                    Eu feugiat pretium nibh ipsum consequat nisl. Ac tortor
                    dignissim convallis aenean. Tellus cras adipiscing enim eu
                    turpis egestas pretium aenean. Interdum velit laoreet id
                    donec ultrices tincidunt arcu non.
                  </p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item mb-5">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>Another Question?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>
                    Eu feugiat pretium nibh ipsum consequat nisl. Ac tortor
                    dignissim convallis aenean. Tellus cras adipiscing enim eu
                    turpis egestas pretium aenean. Interdum velit laoreet id
                    donec ultrices tincidunt arcu non.
                  </p>
                </div>
              </div>
              <hr />
            </div>
            <div className="c-faq-item">
              <div className="c-faq-itemQuestion">
                <span />
                <h3>Q.</h3>
                <p>Another Question?</p>
              </div>
              <div className="c-faq-itemAnswer">
                <span />
                <h3>A.</h3>
                <div className="c-faq-itemAnswerDetails">
                  <p>
                    Eu feugiat pretium nibh ipsum consequat nisl. Ac tortor
                    dignissim convallis aenean. Tellus cras adipiscing enim eu
                    turpis egestas pretium aenean. Interdum velit laoreet id
                    donec ultrices tincidunt arcu non.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LandingFooter />
    </div>
  );
};

export default LoadingScreen(FAQ, 'public');
