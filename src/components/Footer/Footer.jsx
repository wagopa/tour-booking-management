import React from "react";
import { Link } from "react-router-dom";
import web_logo from '../../assets/web_logo.png';
import facebook_logo from '../../assets/facebook_logo.png';
import instagram_logo from '../../assets/instagram_logo.png';
import youtube_logo from '../../assets/youtube_logo.png';
import tiktok_logo from '../../assets/tiktok_logo.png';
import telegram_logo from '../../assets/telegram_logo.png';

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={web_logo} alt="VNTravel Logo" className="web-logo" />
        <span>VNTravel</span>
      </div>

      <div className="footer-center">
        <div className="footer-column">
          <h4>VNTravel</h4>
          <Link to="/">Trang chủ</Link>
          <Link to="/about">Giới thiệu</Link>
          <Link to="/contact">Liên hệ</Link>
          <Link to="/tours">Đặt tour</Link>
        </div>

      <div className="footer-column">
          <h4>Theo dõi chúng tôi trên</h4>
          <a href="https://web.facebook.com/?_rdc=2&_rdr#">
            <img src={facebook_logo} />
            Facebook
          </a>
          <a href="https://www.instagram.com/">
          <img src={instagram_logo} />
            Instagram
          </a>
          <a href="https://www.youtube.com/?app=desktop&hl=vi&themeRefresh=1">
          <img src={youtube_logo} /> 
            Youtube
          </a>
          <a href="https://www.tiktok.com/vi-VN/">
          <img src={tiktok_logo} />
            TikTok
          </a>
          <a href="https://web.telegram.org/">
          <img src={telegram_logo} />
            Telegram
          </a>
        </div>

        <div className="footer-column">
          <h4>Thông tin liên hệ</h4>
          <p><strong>Địa chỉ:</strong> 122 Hoàng Quốc Việt, Q. Cầu Giấy, Hà Nội</p>
          <p><strong>Điện thoại:</strong> (+84) 938 117 328</p>
          <p><strong>Email:</strong> vntravel@gmail.com</p>
          <p><strong>Website:</strong> vntravel.com</p>
        </div>
      </div>
    </footer>
  );
}