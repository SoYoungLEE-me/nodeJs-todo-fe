import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import api from "../../../../utils/api";

const Header = () => {
  const [quote, setQuote] = useState("Loading today’s inspiration...");
  const [author, setAuthor] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const isLoggedIn = Boolean(sessionStorage.getItem("token"));

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    delete api.defaults.headers.authorization;
    navigate("/login");
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/fetch-quote");
        const data = await response.json();

        // 데이터 중에서 랜덤으로 하나 선택
        const random = data[Math.floor(Math.random() * data.length)];

        setQuote(random.text);
        // 저자 이름 뒤의 'type.fit' 문구나 콤마 이후 내용 제거하기
        setAuthor(random.author ? random.author.split(",")[0] : "Anonymous");
      } catch (error) {
        console.error("명언 호출 실패:", error);
        setQuote("Believe in yourself and all that you are.");
        setAuthor("Christian D. Larson");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="Header">
      {isLoggedIn ? (
        <button className="Header_login_btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="Header_login_btn" onClick={() => navigate("/login")}>
          Login
        </button>
      )}

      <div className="Header_left">
        <h1>{formattedDate}</h1>
      </div>

      <div className="Header_right">
        <div className={`Header_quote_container ${isLoading ? "loading" : ""}`}>
          {isLoading ? (
            <p className="Header_quote">Picking a star for you...</p>
          ) : (
            <>
              <p className="Header_quote">"{quote}"</p>
              <span className="Header_author">- {author}</span>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
