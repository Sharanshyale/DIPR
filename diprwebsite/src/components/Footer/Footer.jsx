import React, { useContext, useEffect, useState } from "react";
import { FaClock, FaUsers, FaCodeBranch } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import {
  FooterContainer,
  FooterContent,
  LogoSection,
  Logo,
  Section,
  VisitorsSection,
  Title,
  Text,
  LinksList,
  LinkItem,
  FooterStripContainer,
  FooterStrip,
  StripText,
  FooterSection,
} from "./Footer.styles";
import logo from '../../assets/Logo.png';
import { FontSizeContext } from "../../context/FontSizeProvider";
import { LanguageContext } from "../../context/LanguageContext";
import { GetTotalVisitorApi, RegisterVisitorApi } from "../../services/viewsapi/ViewsApi";

const translations = {
  English: {
    disclaimerTitle: "Disclaimer :",
    disclaimerText:
      "Please note that this page also provides links to the websites / web pages of Govt. Ministries/Departments/Organisations. The content of these websites are owned by the respective organisations and they may be contacted for any further information or suggestion.",
    websitePoliciesTitle: "Website Policies",
    copyrightPolicy: "Copyright Policy",
    hyperlinkingPolicy: "Hyperlinking Policy",
    securityPolicy: "Security Policy",
    guidelines: "Guidelines",
    termsAndConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    help: "Help",
    visitorsTitle: "Visitors",
    lastUpdated: "Last Updated: 18-01-2025 11:33 AM",
    visitorsCounter: "Visitors Counter: 212444",
    version: "Version: C64/KBN 1.3",
    footerStripText:
      "Designed, Developed and Hosted by: Center for e-Governance - Web Portal, Government of Karnataka © 2025, All Rights Reserved.",
  },
  Hindi: {
    disclaimerTitle: "अस्वीकरण :",
    disclaimerText:
      "कृपया ध्यान दें कि इस पृष्ठ पर सरकारी मंत्रालयों/विभागों/संगठनों की वेबसाइटों/वेब पृष्ठों के लिंक भी प्रदान किए गए हैं। इन वेबसाइटों की सामग्री संबंधित संगठनों के स्वामित्व में है और किसी भी अतिरिक्त जानकारी या सुझाव के लिए उनसे संपर्क किया जा सकता है।",
    websitePoliciesTitle: "वेबसाइट नीतियां",
    copyrightPolicy: "कॉपीराइट नीति",
    hyperlinkingPolicy: "हाइपरलिंकिंग नीति",
    securityPolicy: "सुरक्षा नीति",
    guidelines: "दिशानिर्देश",
    termsAndConditions: "नियम और शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    help: "सहायता",
    visitorsTitle: "आगंतुक",
    lastUpdated: "अंतिम अद्यतन: 18-01-2025 11:33 AM",
    visitorsCounter: "आगंतुक गणक: 212444",
    version: "संस्करण: C64/KBN 1.3",
    footerStripText:
      "डिज़ाइन, विकसित और होस्ट किया गया: ई-गवर्नेंस केंद्र - वेब पोर्टल, कर्नाटक सरकार © 2025, सर्वाधिकार सुरक्षित।",
  },
  Kannada: {
    disclaimerTitle: "ದೂರವಾಣಿ :",
    disclaimerText:
      "ದಯವಿಟ್ಟು ಗಮನಿಸಿ: ಈ ಪುಟವು ಸರ್ಕಾರಿ ಸಚಿವಾಲಯಗಳು/ವಿಭಾಗಗಳು/ಸಂಸ್ಥೆಗಳ ವೆಬ್ಸೈಟ್/ವೆಬ್ ಪುಟಗಳಿಗೆ ಲಿಂಕ್‌ಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ. ಈ ವೆಬ್ಸೈಟ್‌ಗಳ ವಿಷಯವು ಸಂಬಂಧಿತ ಸಂಸ್ಥೆಗಳ ಸ್ವಾಮ್ಯದಲ್ಲಿದೆ ಮತ್ತು ಯಾವುದೇ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಅಥವಾ ಸಲಹೆಗಾಗಿ ಅವರನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು.",
    websitePoliciesTitle: "ವೆಬ್‌ಸೈಟ್ ನೀತಿಗಳು",
    copyrightPolicy: "ಕೃತಿಸ್ವಾಮ್ಯ ನೀತಿ",
    hyperlinkingPolicy: "ಹೈಪರ್‌ಲಿಂಕಿಂಗ್ ನೀತಿ",
    securityPolicy: "ಸುರಕ್ಷತಾ ನೀತಿ",
    guidelines: "ಮಾರ್ಗದರ್ಶನಗಳು",
    termsAndConditions: "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು",
    privacyPolicy: "ಗೌಪ್ಯತಾ ನೀತಿ",
    help: "ಸಹಾಯ",
    visitorsTitle: "ಭೇಟಿಕಾರರು",
    lastUpdated: "ಕೊನೆಯ ನವೀಕರಣ: 18-01-2025 11:33 AM",
    visitorsCounter: "ಭೇಟಿಕಾರರ ಗಣಕ: 212444",
    version: "ಆವೃತ್ತಿ: C64/KBN 1.3",
    footerStripText:
      "ವಿನ್ಯಾಸಗೊಳಿಸಿದ, ಅಭಿವೃದ್ಧಿಪಡಿಸಿದ ಮತ್ತು ಹೋಸ್ಟ್ ಮಾಡಿದವರು: ಇ-ಗವರ್ನೆನ್ಸ್ ಸೆಂಟರ್ - ವೆಬ್ ಪೋರ್ಟಲ್, ಕರ್ನಾಟಕ ಸರ್ಕಾರ © 2025, ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
  },
};

const Footer = () => {
  const { fontSize } = useContext(FontSizeContext);
  const { language } = useContext(LanguageContext);

  const [visitorData, setVisitorData] = useState({
    lastUpdated: "",
    totalVisitors: 0,
  });

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  const t = translations[language] || translations.English;

  const fetchVisitorData = async () => {
    try {
      // Check if the visitor has already been counted in this session
      const isVisited = sessionStorage.getItem("isVisited");

      if (!isVisited) {
        await RegisterVisitorApi();
        sessionStorage.setItem("isVisited", "true");
      }

      // Fetch the total number of visitors
      const totalVisitorsResponse = await GetTotalVisitorApi();
      setVisitorData({
        lastUpdated: new Date().toLocaleString(),
        totalVisitors: totalVisitorsResponse.totalVisits,
      });
    } catch (error) {
      console.error("Error fetching visitor data:", error);
    }
  };

  // Use useEffect to call the fetchVisitorData function only once on component mount
  useEffect(() => {
    fetchVisitorData();

    // Update the time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <FooterContainer style={{ fontSize: `${fontSize}%` }}>
      <FooterSection>
        <FooterContent style={{ fontSize: `${fontSize}%` }}>
          <LogoSection>
            <Logo src={logo} alt="Government Logo" />
          </LogoSection>

          <Section style={{ fontSize: `${fontSize}%` }}>
            <Title style={{ fontSize: `${fontSize}%` }}>{t.disclaimerTitle}</Title>
            <Text style={{ fontSize: `${fontSize}%` }}>{t.disclaimerText}</Text>
          </Section>

          <Section style={{ fontSize: `${fontSize}%` }}>
            <Title style={{ fontSize: `${fontSize}%` }}>{t.websitePoliciesTitle}</Title>
            <LinksList style={{ fontSize: `${fontSize}%` }}>
              <LinkItem style={{ fontSize: `${fontSize}%` }}>
                <IoIosArrowDroprightCircle />
                <Link style={{ color: 'inherit', fontSize: `${fontSize}%` }} to="/copyright-policy">{t.copyrightPolicy}</Link>
              </LinkItem>
              <LinkItem style={{ fontSize: `${fontSize}%` }}>
                <IoIosArrowDroprightCircle />
                <Link style={{ color: 'inherit', fontSize: `${fontSize}%` }} to="/hyperlinking-policy">{t.hyperlinkingPolicy}</Link>
              </LinkItem>
              <LinkItem style={{ fontSize: `${fontSize}%` }}>
                <IoIosArrowDroprightCircle />
                <Link style={{ color: 'inherit', fontSize: `${fontSize}%` }} to="/security-policy">{t.securityPolicy}</Link>
              </LinkItem>
              <LinkItem style={{ fontSize: `${fontSize}%` }}>
                <IoIosArrowDroprightCircle />
                <Link style={{ color: 'inherit', fontSize: `${fontSize}%` }} to="/guidelines">{t.guidelines}</Link>
              </LinkItem>
              <LinkItem style={{ fontSize: `${fontSize}%` }}>
                <IoIosArrowDroprightCircle />
                <Link style={{ color: 'inherit', fontSize: `${fontSize}%` }} to="/terms-and-conditions">{t.termsAndConditions}</Link>
              </LinkItem>
              <LinkItem style={{ fontSize: `${fontSize}%` }}>
                <IoIosArrowDroprightCircle />
                <Link style={{ color: 'inherit', fontSize: `${fontSize}%` }} to="/privacy-policy">{t.privacyPolicy}</Link>
              </LinkItem>
              <LinkItem style={{ fontSize: `${fontSize}%` }}>
                <IoIosArrowDroprightCircle />
                <Link style={{ color: 'inherit', fontSize: `${fontSize}%` }} to="/help">{t.help}</Link>
              </LinkItem>
            </LinksList>
          </Section>

          <VisitorsSection style={{ fontSize: `${fontSize}%` }}>
            <Title style={{ fontSize: `${fontSize}%` }}>{t.visitorsTitle}</Title>
            <Text style={{ fontSize: `${fontSize}%` }}><FaClock /> {currentTime}</Text>
            <Text style={{ fontSize: `${fontSize}%` }}><FaUsers /> Visitors Counter: {visitorData.totalVisitors}</Text>
            <Text style={{ fontSize: `${fontSize}%` }}><FaCodeBranch /> {t.version}</Text>
          </VisitorsSection>
        </FooterContent>
      </FooterSection>

      <FooterStripContainer style={{ fontSize: `${fontSize}%` }}>
        <FooterStrip>
          <StripText style={{ fontSize: `${fontSize}%` }}>
            {t.footerStripText}
          </StripText>
        </FooterStrip>
      </FooterStripContainer>
    </FooterContainer>
  );
};

export default Footer;
