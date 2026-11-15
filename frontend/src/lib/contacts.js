export const COUNSELORS = [
  
  {
    name: "Satyam Singh",
    role: "Career Counselor",
    phone: "+91 94251 51892",
    tel: "+919425151892",
    wa: "919425151892",
  },
];

export const SUPPORT_EMAIL = "Sovyra tech solutions.in@gmail.com";
export const HOURS = "Mon–Sat, 10am–8pm IST";

export const DEFAULT_WA_TEXT =
  "Hi Sovyra tech solutions! I'd like to know more about your training & internship programs.";

export const waLink = (number, text = DEFAULT_WA_TEXT) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
