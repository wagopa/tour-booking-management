import tourImage1 from "../assets/tour_danang_culaocham.webp";
import tourImage1_1 from "../assets/tour_bana.jpg";
import tourImage1_2 from "../assets/tour_bana1.png";
import tourImage2 from "../assets/tour_danang_hue.jpg";
import tourImage3 from "../assets/tour_yenbai.jpeg";
import tourImage3_1 from "../assets/tour_thacba.webp";
import tourImage3_2 from "../assets/tour_nghialo.jpg";
import tourImage3_3 from "../assets/tour_thacba1.jpg";
import tourImage4 from "../assets/tour_caobang.jpg";
import tourImage4_1 from "../assets/tour_cocbo.jpg";
import tourImage4_2 from "../assets/tour_bangioc.jpg";
import tourImage4_3 from "../assets/tour_maphuc.jpg";
import tourImage5 from "../assets/tour_sapa.jpg";
import tourImage5_1 from "../assets/tour_catcat.jpg";
import tourImage5_2 from "../assets/tour_tavan.webp";
import tourImage5_3 from "../assets/tour_oquyho.jpg";
import tourImage6 from "../assets/tour_quangninh.jpg";
import tourImage6_1 from "../assets/tour_vinhhalong.jpg";
import tourImage6_2 from "../assets/tour_vinhhalong1.jpg";
import tourImage6_3 from "../assets/tour_baichay.jpg";
import tourImage7 from "../assets/tour_vinwonder.jpg";
import tourImage7_1 from "../assets/tour_vinwonder1.jpg";
import tourImage7_2 from "../assets/tour_baisao.webp";
import tourImage7_3 from "../assets/tour_sunsetsanato.jpg";
import tourImage8 from "../assets/tour_trangan.webp";
import tourImage9 from "../assets/tour_muine.jpg";
import tourImage9_1 from "../assets/tour_doicatbay.jpg";
import tourImage9_2 from "../assets/tour_langchai.jpg";
import tourImage9_3 from "../assets/tour_muine1.webp";
import tourImage10 from "../assets/tour_chonoi.jpg";
import tourImage10_1 from "../assets/tour_chonoi1.jpg";
import tourImage10_2 from "../assets/tour_caibe.jpg";
import tourImage10_3 from "../assets/tour_caibe1.jpg";
import tourImage11 from "../assets/tour_dongvan.jpg";
import tourImage11_1 from "../assets/tour_dongvan1.jpg";
import tourImage11_2 from "../assets/tour_mapileng.jpg";
import tourImage11_3 from "../assets/tour_lungcu.jpg";
import tourImage12 from "../assets/tour_vuontraicay.jpg";
import tourImage12_1 from "../assets/tour_vuontraicay1.jpg";
import tourImage13 from "../assets/tour_quanba.jpg";
import tourImage13_1 from "../assets/tour_meovac.webp";
import tourImage14 from "../assets/tour_hoian.jpg";
import tourImage15 from "../assets/tour_thapdraynur.jpg";
import tourImage15_1 from "../assets/tour_thapdraynur1.jpg";
import tourImage15_2 from "../assets/tour_buondon.jpg";
import tourImage15_3 from "../assets/tour_holak.jpg";

const tours = [
  {
    id: 1,
    name: "Tour Đà Nẵng 3N2Đ | Đà Nẵng - Cù Lao Chàm - Hội An - Bà Nà",
    departure: "TP. Hồ Chí Minh",
    destinations: ["Đà Nẵng", "Cù Lao Chàm", "Hội An", "Bà Nà"],
    duration: "3 Ngày 2 Đêm",
    departureDates: ["2025-06-12", "2025-06-18", "2025-06-25"],
    price: "3.990.000 VND",
    images: [tourImage1, tourImage14, tourImage1_1, tourImage1_2],
    description: "Khám phá vẻ đẹp của Đà Nẵng, Cù Lao Chàm thơ mộng, Hội An cổ kính và Bà Nà Hills với không khí trong lành.",
    maxPeople: 25,
    itinerary: [
      {
        day: 1,
        title: "Khởi hành - Đà Nẵng - Hội An",
        activities: [
          "Sáng: Khởi hành từ TP. Hồ Chí Minh, đến sân bay Đà Nẵng.",
          "Chiều: Tham quan phố cổ Hội An, chùa Cầu, nhà cổ Tấn Ký.",
          "Tối: Thưởng thức đặc sản Hội An, nghỉ đêm tại Đà Nẵng."
        ]
      },
      {
        day: 2,
        title: "Cù Lao Chàm - Đà Nẵng",
        activities: [
          "Sáng: Di chuyển đến Cù Lao Chàm, tắm biển, lặn ngắm san hô.",
          "Chiều: Tham quan chợ Tân An, làng chài.",
          "Tối: Tự do khám phá cầu Rồng và bãi biển Mỹ Khê."
        ]
      },
      {
        day: 3,
        title: "Bà Nà Hills - Kết thúc",
        activities: [
          "Sáng: Tham quan Bà Nà Hills, Cầu Vàng, vườn hoa Le Jardin D’Amour.",
          "Chiều: Trở về Đà Nẵng, mua sắm đặc sản.",
          "Tối: Kết thúc tour, trở về TP. Hồ Chí Minh."
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Tour Đà Nẵng 4N3Đ | Đà Nẵng - Hội An - Bà Nà - Huế",
    departure: "Hà Nội",
    destinations: ["Đà Nẵng", "Hội An", "Bà Nà", "Huế"],
    duration: "4 Ngày 3 Đêm",
    departureDates: ["2025-06-10", "2025-06-15", "2025-06-20"],
    price: "5.250.000 VND",
    images: [tourImage2, tourImage1_1, tourImage1_2, tourImage14],
    description: "Hành trình khám phá miền Trung với Đà Nẵng, Hội An, Bà Nà Hills và cố đô Huế đầy lịch sử.",
    maxPeople: 20,
    itinerary: [
      {
        day: 1,
        title: "Khởi hành - Đà Nẵng",
        activities: [
          "Sáng: Khởi hành từ Hà Nội, đến sân bay Đà Nẵng.",
          "Chiều: Tham quan bán đảo Sơn Trà, chùa Linh Ứng.",
          "Tối: Nghỉ đêm tại Đà Nẵng, tự do khám phá."
        ]
      },
      {
        day: 2,
        title: "Hội An - Đà Nẵng",
        activities: [
          "Sáng: Tham quan phố cổ Hội An, hội quán Phúc Kiến.",
          "Chiều: Trải nghiệm làm đèn lồng truyền thống.",
          "Tối: Trở về Đà Nẵng, thưởng thức đặc sản."
        ]
      },
      {
        day: 3,
        title: "Bà Nà Hills - Huế",
        activities: [
          "Sáng: Tham quan Bà Nà Hills, cáp treo, Fantasy Park.",
          "Chiều: Di chuyển đến Huế, tham quan cầu Trường Tiền.",
          "Tối: Nghỉ đêm tại Huế."
        ]
      },
      {
        day: 4,
        title: "Huế - Kết thúc",
        activities: [
          "Sáng: Tham quan Đại Nội, lăng Tự Đức.",
          "Chiều: Mua sắm đặc sản Huế, trở về Đà Nẵng.",
          "Tối: Kết thúc tour, bay về Hà Nội."
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Tour Yên Bái 2N1Đ | Mù Cang Chải - Nghĩa Lộ - Thác Bà",
    departure: "Hà Nội",
    destinations: ["Mù Cang Chải", "Nghĩa Lộ", "Thác Bà"],
    duration: "2 Ngày 1 Đêm",
    departureDates: ["2025-06-11", "2025-06-16", "2025-06-21"],
    price: "2.450.000 VND",
    images: [tourImage3, tourImage3_1, tourImage3_2, tourImage3_3],
    description: "Trải nghiệm vẻ đẹp Tây Bắc với Mù Cang Chải, Nghĩa Lộ và hồ Thác Bà yên bình.",
    maxPeople: 22,
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Mù Cang Chải - Nghĩa Lộ",
        activities: [
          "Sáng: Khởi hành từ Hà Nội, đi Mù Cang Chải.",
          "Chiều: Tham quan đồi chè, ruộng bậc thang Tú Lệ.",
          "Tối: Nghỉ đêm tại Nghĩa Lộ, thưởng thức văn hóa Thái."
        ]
      },
      {
        day: 2,
        title: "Nghĩa Lộ - Thác Bà - Hà Nội",
        activities: [
          "Sáng: Tham quan hồ Thác Bà, đi thuyền khám phá.",
          "Chiều: Trở về Hà Nội, mua sắm đặc sản Yên Bái.",
          "Tối: Kết thúc tour tại Hà Nội."
        ]
      }
    ]
  },
  {
    id: 4,
    name: "Tour Cao Bằng 3N2Đ | Cao Bằng - Bản Giốc - Mã Phục - Cốc Bó",
    departure: "Hà Nội",
    destinations: ["Cao Bằng", "Bản Giốc", "Mã Phục", "Cốc Bó"],
    duration: "3 Ngày 2 Đêm",
    departureDates: ["2025-06-12", "2025-06-18", "2025-06-25"],
    price: "3.990.000 VND",
    images: [tourImage4, tourImage4_1, tourImage4_2, tourImage4_3],
    description: "Khám phá Cao Bằng với thác Bản Giốc hùng vĩ, Mã Phục và hang Cốc Bó lịch sử.",
    maxPeople: 25,
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Cao Bằng",
        activities: [
          "Sáng: Khởi hành từ Hà Nội, đến Cao Bằng.",
          "Chiều: Tham quan núi Thang Hen, hồ Thang Hen.",
          "Tối: Nghỉ đêm tại Cao Bằng, thưởng thức ẩm thực địa phương."
        ]
      },
      {
        day: 2,
        title: "Thác Bản Giốc - Mà Phùc",
        activities: [
          "Sáng: Tham quan thác Bản Giốc, chụp ảnh cảnh quan.",
          "Chiều: Khám phá làng Mã Phục, tìm hiểu văn hóa Tày.",
          "Tối: Nghỉ đêm tại Cao Bằng."
        ]
      },
      {
        day: 3,
        title: "Cốc Bó - Hà Nội",
        activities: [
          "Sáng: Tham quan hang Cốc Bó, di tích lịch sử.",
          "Chiều: Mua sắm đặc sản Cao Bằng, trở về Hà Nội.",
          "Tối: Kết thúc tour."
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Tour Sapa 2N1Đ | Sapa - Cát Cát - Ô Quý Hồ - Tả Van",
    departure: "Hà Nội",
    destinations: ["Sapa", "Cát Cát", "Ô Quý Hồ", "Tả Van"],
    duration: "2 Ngày 1 Đêm",
    departureDates: ["2025-06-10", "2025-06-15", "2025-06-20"],
    price: "2.750.000 VND",
    images: [tourImage5, tourImage5_1, tourImage5_2, tourImage5_3],
    description: "Khám phá Sapa với làng Cát Cát, đèo Ô Quý Hồ hùng vĩ và bản Tả Van yên bình.",
    maxPeople: 30,
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Sapa - Cát Cát",
        activities: [
          "Sáng: Khởi hành từ Hà Nội, đến Sapa.",
          "Chiều: Tham quan bản Cát Cát, tìm hiểu văn hóa H’Mông.",
          "Tối: Nghỉ đêm tại Sapa, tự do khám phá chợ đêm."
        ]
      },
      {
        day: 2,
        title: "Ô Quý Hồ - Tả Van - Hà Nội",
        activities: [
          "Sáng: Tham quan đèo Ô Quý Hồ, chụp ảnh cảnh quan.",
          "Chiều: Khám phá bản Tả Van, mua sắm thổ cẩm.",
          "Tối: Trở về Hà Nội, kết thúc tour."
        ]
      }
    ]
  },
  {
    id: 6,
    name: "Tour Quảng Ninh 3N2Đ | Vịnh Hạ Long - Bãi Cháy",
    departure: "Hà Nội",
    destinations: ["Vịnh Hạ Long", "Bãi Cháy"],
    duration: "3 Ngày 2 Đêm",
    departureDates: ["2025-06-11", "2025-06-16", "2025-06-21"],
    price: "3.450.000 VND",
    images: [tourImage6, tourImage6_1, tourImage6_2, tourImage6_3],
    description: "Trải nghiệm Vịnh Hạ Long - kỳ quan thiên nhiên thế giới và khu du lịch Bãi Cháy sôi động.",
    maxPeople: 28,
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Vịnh Hạ Long",
        activities: [
          "Sáng: Khởi hành từ Hà Nội, đến Hạ Long.",
          "Chiều: Đi thuyền tham quan vịnh Hạ Long, hang Sửng Sốt.",
          "Tối: Nghỉ đêm trên du thuyền hoặc khách sạn."
        ]
      },
      {
        day: 2,
        title: "Vịnh Hạ Long - Bãi Cháy",
        activities: [
          "Sáng: Tham quan đảo Titop, tắm biển.",
          "Chiều: Di chuyển đến Bái Chảy, tham quan công viên Sun World.",
          "Tối: Nghỉ đêm tại Bái Chảy."
        ]
      },
      {
        day: 3,
        title: "Bãi Cháy - Hà Nội",
        activities: [
          "Sáng: Tham quan bảo tàng Quảng Ninh.",
          "Chiều: Mua sắm đặc sản Hạ Long, trở về Hà Nội.",
          "Tối: Kết thúc tour."
        ]
      }
    ]
  },
  {
    id: 7,
    name: "Tour Phú Quốc 3N2Đ | Bãi Sao - VinWonders - Sunset Sanato",
    departure: "TP. Hồ Chí Minh",
    destinations: ["Phú Quốc", "Bãi Sao", "VinWonders", "Sunset Sanato"],
    duration: "3 Ngày 2 Đêm",
    departureDates: ["2025-06-12", "2025-06-18", "2025-06-24"],
    price: "6.750.000 VND",
    images: [tourImage7, tourImage7_1, tourImage7_2, tourImage7_3],
    description: "Hành trình nghỉ dưỡng tuyệt vời tại thiên đường biển đảo Phú Quốc với biển xanh, cát trắng.",
    maxPeople: 28,
    itinerary: [
      {
        day: 1,
        title: "TP. Hồ Chí Minh - Phú Quốc",
        activities: [
          "Sáng: Bay từ TP.HCM đến Phú Quốc.",
          "Chiều: Tham quan Sunset Sanato - điểm check-in nổi tiếng.",
          "Tối: Nghỉ đêm tại resort, tự do khám phá chợ đêm Dinh Cậu."
        ]
      },
      {
        day: 2,
        title: "VinWonders - Bãi Sao",
        activities: [
          "Sáng: Vui chơi tại công viên giải trí VinWonders Phú Quốc.",
          "Chiều: Tắm biển tại Bãi Sao, trải nghiệm thể thao biển.",
          "Tối: Nghỉ đêm tại Phú Quốc."
        ]
      },
      {
        day: 3,
        title: "Phú Quốc - TP. Hồ Chí Minh",
        activities: [
          "Sáng: Tham quan cơ sở sản xuất ngọc trai và nước mắm.",
          "Chiều: Bay về TP.HCM, kết thúc tour.",
          "Tối: Kết thúc tour."
        ]
      }
    ]
  },
  {
    id: 8,
    name: "Tour Ninh Bình 2N1Đ | Tràng An - Tam Cốc - Chùa Bái Đính",
    departure: "Hà Nội",
    destinations: ["Ninh Bình", "Tràng An", "Tam Cốc"],
    duration: "2 Ngày 1 Đêm",
    departureDates: ["2025-06-13", "2025-06-19", "2025-06-25"],
    price: "2.750.000 VND",
    images: [tourImage8],
    description: "Trải nghiệm Hội An - lấp lánh phố cổ sông nước và khu du lịch thánh địa Mỹ Sơn.",
    maxPeople: 25,
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Tam Cốc",
        activities: [
          "Sáng: Khởi hành từ Hà Nội, đến tham Tam Cốc.",
          "Chiều: Ngồi thuyền, chèo đò tận hưởng cảnh sắc nước non Tam Cốc",
          "Tối: Nghỉ đêm tại khách sạn địa phương."
        ]
      },
      {
        day: 2,
        title: "tràng An - Hà Nội",
        activities: [
          "Sáng: Di chuyển đến khu du lịch Tràng An.",
          "Chiều: Khám phá các thung lũng, dải đá vôi hùng vĩ cùng các hang động tự nhiên.",
          "Tối: Kết thúc tour."
        ]
      }
    ]
  },
  {
    id: 9,
    name: "Tour Phan Thiết 3N2Đ | Mũi Né - Đồi Cát Bay - Làng Chài",
    departure: "TP. Hồ Chí Minh",
    destinations: ["Mũi Né", "Phan Thiết", "Đồi Cát Bay", "Làng Chài"],
    duration: "3 Ngày 2 Đêm",
    departureDates: ["2025-06-15", "2025-06-22", "2025-06-29"],
    price: "3.150.000 VND",
    images: [tourImage9, tourImage9_1, tourImage9_2, tourImage9_3],
    description: "Hành trình khám phá nắng vàng – biển xanh – cát trắng ở Phan Thiết, đồi cát bay và làng chài đặc sắc.",
    maxPeople: 28,
    itinerary: [
      {
        day: 1,
        title: "TP.HCM - Phan Thiết",
        activities: [
          "Sáng: Di chuyển từ TP.HCM đến Phan Thiết.",
          "Chiều: Tham quan Lầu Ông Hoàng, tháp Chàm Pô Sah Inư.",
          "Tối: Tự do khám phá biển đêm Mũi Né."
        ]
      },
      {
        day: 2,
        title: "Đồi Cát - Làng Chài - Suối Tiên",
        activities: [
          "Sáng: Ngắm bình minh tại đồi cát bay, trượt cát.",
          "Chiều: Tham quan làng chài, suối Tiên.",
          "Tối: Nghỉ đêm tại Phan Thiết."
        ]
      },
      {
        day: 3,
        title: "Phan Thiết - TP.HCM",
        activities: [
          "Sáng: Tự do tắm biển, mua đặc sản.",
          "Chiều: Trở về TP.HCM.",
          "Tối: Kết thúc tour."
        ]
      }
    ]
  },
  {
    id: 10,
    name: "Tour Miền Tây 2N1Đ | Cái Bè - Cần Thơ - Chợ Nổi Cái Răng",
    departure: "TP. Hồ Chí Minh",
    destinations: ["Cái Bè", "Cần Thơ", "Chợ Nổi Cái Răng"],
    duration: "2 Ngày 1 Đêm",
    departureDates: ["2025-06-14", "2025-06-20", "2025-06-26"],
    price: "2.290.000 VND",
    images: [tourImage10, tourImage10_1, tourImage10_2, tourImage10_3],
    description: "Trải nghiệm miền Tây sông nước với chợ nổi, vườn trái cây trĩu quả và nét văn hóa đặc trưng vùng đồng bằng.",
    maxPeople: 30,
    itinerary: [
      {
        day: 1,
        title: "TP.HCM - Cái Bè - Cần Thơ",
        activities: [
          "Sáng: Khởi hành từ TP.HCM, đến Cái Bè tham quan vườn trái cây, đi thuyền trên sông Tiền.",
          "Chiều: Di chuyển đến Cần Thơ, tham quan bến Ninh Kiều.",
          "Tối: Nghỉ đêm tại Cần Thơ, tự do khám phá ẩm thực miền Tây."
        ]
      },
      {
        day: 2,
        title: "Chợ Nổi Cái Răng - TP.HCM",
        activities: [
          "Sáng: Tham quan chợ nổi Cái Răng – chợ nổi lớn nhất miền Tây.",
          "Chiều: Mua đặc sản Cần Thơ, trở về TP.HCM.",
          "Tối: Kết thúc tour."
        ]
      }
    ]
  },
  {
    id: 11,
    name: "Tour Hà Giang 3N2Đ | Đồng Văn - Mã Pì Lèng - Lũng Cú",
    departure: "Hà Nội",
    destinations: ["Đồng Văn", "Mã Pì Lèng", "Lũng Cú"],
    duration: "3 Ngày 2 Đêm",
    departureDates: ["2025-06-13", "2025-06-19", "2025-06-26"],
    price: "3.950.000 VND",
    images: [tourImage11, tourImage11_1, tourImage11_2, tourImage11_3],
    description: "Khám phá cực Bắc tổ quốc – nơi non cao hùng vĩ, cao nguyên đá và bản sắc văn hóa đặc trưng.",
    maxPeople: 20,
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Hà Giang",
        activities: [
          "Sáng: Khởi hành từ Hà Nội, đến thành phố Hà Giang.",
          "Chiều: Check-in cột mốc Km số 0, chụp ảnh sông Lô.",
          "Tối: Nghỉ đêm tại TP. Hà Giang."
        ]
      },
      {
        day: 2,
        title: "Quản Bạ - Đồng Văn - Mã Pì Lèng",
        activities: [
          "Sáng: Qua dốc Bắc Sum, núi đôi Quản Bạ.",
          "Chiều: Tham quan Mã Pì Lèng, phố cổ Đồng Văn.",
          "Tối: Nghỉ đêm tại Đồng Văn."
        ]
      },
      {
        day: 3,
        title: "Lũng Cú - Hà Nội",
        activities: [
          "Sáng: Chinh phục cột cờ Lũng Cú – điểm cực Bắc.",
          "Chiều: Di chuyển về lại Hà Nội.",
          "Tối: Kết thúc tour."
        ]
      }
    ]
  },
  {
    id: 12,
    name: "Tour Cần Thơ 3N2Đ | Cần Thơ - Chợ Nổi Cái Răng - Vườn Trái Cây",
    departure: "TP. Hồ Chí Minh",
    destinations: ["Cần Thơ", "Chợ Nổi Cái Răng", "Phong Điền", "Vườn Trái Cây"],
    duration: "3 Ngày 2 Đêm",
    departureDates: ["2025-06-14", "2025-06-20", "2025-06-26"],
    price: "2.990.000 VND",
    images: [tourImage12, tourImage10, tourImage12_1, tourImage10_1],
    description: "Trải nghiệm văn hóa sông nước miền Tây với chợ nổi, miệt vườn và ẩm thực dân dã.",
    maxPeople: 30,
    itinerary: [
      {
        day: 1,
        title: "TP. Hồ Chí Minh - Cần Thơ",
        activities: [
          "Sáng: Khởi hành từ TP.HCM, di chuyển đến Cần Thơ.",
          "Chiều: Tham quan nhà cổ Bình Thủy, cầu đi bộ Ninh Kiều.",
          "Tối: Nghỉ đêm tại Cần Thơ, thưởng thức đặc sản cá lóc nướng trui."
        ]
      },
      {
        day: 2,
        title: "Chợ Nổi Cái Răng - Vườn Trái Cây",
        activities: [
          "Sáng: Du thuyền tham quan chợ nổi Cái Răng, trải nghiệm buôn bán trên sông.",
          "Chiều: Khám phá vườn trái cây Phong Điền, thưởng thức trái cây tươi tại vườn.",
          "Tối: Tự do khám phá Cần Thơ về đêm."
        ]
      },
      {
        day: 3,
        title: "Cần Thơ - TP. Hồ Chí Minh",
        activities: [
          "Sáng: Tham quan thiền viện Trúc Lâm Phương Nam.",
          "Chiều: Mua sắm đặc sản Cần Thơ, trở về TP.HCM.",
          "Tối: Kết thúc tour."
        ]
      }
    ]
  },
  {
    id: 13,
    name: "Tour Hà Giang 4N3Đ | Quản Bạ - Đồng Văn - Lũng Cú - Mèo Vạc",
    departure: "Hà Nội",
    destinations: ["Hà Giang", "Quản Bạ", "Đồng Văn", "Lũng Cú", "Mèo Vạc"],
    duration: "4 Ngày 3 Đêm",
    departureDates: ["2025-06-13", "2025-06-19", "2025-06-25"],
    price: "4.250.000 VND",
    images: [tourImage13, tourImage11, tourImage11_3, tourImage13_1],
    description: "Khám phá vùng cao nguyên đá Đồng Văn hùng vĩ và văn hóa các dân tộc vùng cực Bắc.",
    maxPeople: 20,
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Hà Giang - Quản Bạ",
        activities: [
          "Sáng: Khởi hành từ Hà Nội đến TP. Hà Giang.",
          "Chiều: Tham quan cổng trời Quản Bạ, núi đôi Cô Tiên.",
          "Tối: Nghỉ đêm tại Quản Bạ."
        ]
      },
      {
        day: 2,
        title: "Đồng Văn - Dinh Vua Mèo",
        activities: [
          "Sáng: Tham quan dinh thự Vua Mèo Vương Chính Đức.",
          "Chiều: Check-in đèo Mã Pí Lèng, sông Nho Quế.",
          "Tối: Nghỉ đêm tại Đồng Văn."
        ]
      },
      {
        day: 3,
        title: "Lũng Cú - Mèo Vạc",
        activities: [
          "Sáng: Tham quan cột cờ Lũng Cú - điểm cực Bắc Tổ Quốc.",
          "Chiều: Di chuyển đến Mèo Vạc, khám phá văn hóa dân tộc Lô Lô.",
          "Tối: Nghỉ đêm tại Mèo Vạc."
        ]
      },
      {
        day: 4,
        title: "Hà Giang - Hà Nội",
        activities: [
          "Sáng: Trở về Hà Giang, ghé làng dệt thổ cẩm Lùng Tám.",
          "Chiều: Khởi hành về Hà Nội.",
          "Tối: Kết thúc tour."
        ]
      }
    ]
  },
  {
    id: 14,
    name: "Tour Quảng Nam 2N1Đ | Hội An - Mỹ Sơn",
    departure: "Hà Nội",
    destinations: ["Quảng Nam", "Hội An", "Mỹ Sơn"],
    duration: "2 Ngày 1 Đêm",
    departureDates: ["2025-06-11", "2025-06-16", "2025-06-21"],
    price: "2.450.000 VND",
    images: [tourImage14],
    description: "Trải nghiệm Hội An - lấp lánh phố cổ sông nước và khu du lịch thánh địa Mỹ Sơn.",
    maxPeople: 25,
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Hội An - Mỹ Sơn",
        activities: [
          "Sáng: Khởi hành từ Hà Nội, đến Hội An.",
          "Chiều: Đi thuyền tham quan phố cổ Hội An, chèo thuyền trên sông.",
          "Tối: Nghỉ đêm tại khách sạn địa phương ở thánh địa Mỹ Sơn."
        ]
      },
      {
        day: 2,
        title: "Mỹ Sơn - Hà Nội",
        activities: [
          "Sáng: Tham quan thánh địa Mỹ Sơn.",
          "Chiều: Mua sắm đặc sản Mỹ Sơn, trở về Hà Nội.",
          "Tối: Kết thúc tour."
        ]
      }
    ]
  },
  {
    id: 15,
    name: "Tour Đắk Lắk 3N2Đ | Buôn Đôn - Hồ Lắk - Thác Dray Nur",
    departure: "TP. Hồ Chí Minh",
    destinations: ["Đắk Lắk", "Buôn Đôn", "Hồ Lắk", "Thác Dray Nur"],
    duration: "3 Ngày 2 Đêm",
    departureDates: ["2025-06-14", "2025-06-19", "2025-06-26"],
    price: "3.250.000 VND",
    images: [tourImage15, tourImage15_1, tourImage15_2, tourImage15_3],
    description: "Khám phá Tây Nguyên đại ngàn với văn hóa cồng chiêng, cưỡi voi và thác nước hùng vĩ.",
    maxPeople: 24,
    itinerary: [
      {
        day: 1,
        title: "TP. Hồ Chí Minh - Buôn Ma Thuột",
        activities: [
          "Sáng: Bay từ TP.HCM đến Buôn Ma Thuột.",
          "Chiều: Tham quan bảo tàng Cà Phê Thế Giới, nhà thờ gỗ Buôn Ma Thuột.",
          "Tối: Nghỉ đêm tại thành phố, thưởng thức cơm lam gà nướng."
        ]
      },
      {
        day: 2,
        title: "Buôn Đôn - Hồ Lắk",
        activities: [
          "Sáng: Khám phá Buôn Đôn, cưỡi voi, cầu treo Sêrêpôk.",
          "Chiều: Du ngoạn hồ Lắk bằng thuyền độc mộc.",
          "Tối: Nghỉ đêm tại nhà dài truyền thống."
        ]
      },
      {
        day: 3,
        title: "Thác Dray Nur - TP. Hồ Chí Minh",
        activities: [
          "Sáng: Tham quan thác Dray Nur và Dray Sáp.",
          "Chiều: Mua sắm cà phê đặc sản, bay về TP.HCM.",
          "Tối: Kết thúc tour."
        ]
      }
    ]
  },
];

export default tours;