import React from "react";

const Banner = () => {
  return (
    <div class="header__top">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-7">
            <div class="header__top__left">
              <p>Free shipping, 30-day return or refund guarantee.</p>
            </div>
          </div>
          <div class="col-lg-6 col-md-5">
            <div class="header__top__right">
              <div class="header__top__links">
                <a href="#">Sign in</a>
                <a href="#">FAQs</a>
              </div>
              <div class="header__top__hover">
                <span>
                  Usd <i class="arrow_carrot-down"></i>
                </span>
                <ul>
                  <li>USD</li>
                  <li>EUR</li>
                  <li>USD</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
