// 공통 컴포넌트
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Main from "./components/common/Main";
// 라우터 관련
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// 멤버 관련 페이지
import Login from "./components/member/Login";
import Join from "./components/member/Join";
import Join2 from "./components/member/Join2";
// 여행 계획 관련
import UpdatePw from "./components/member/UpdatePw";
import UpdatePw2 from "./components/member/UpdatePw2";
import PlannerFrm from "./components/planner/PlannerFrm";
// 콘텐츠 및 리뷰
import ContentMain from "./components/content/ContentMain";
import ReviewMain from "./components/review/ReviewMain";
// 상태 관리
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoginState, isPlannerState } from "./components/utils/RecoilData";
// 리액트 훅
import { useEffect, useState } from "react";
import ChatMenu from "./components/chat/ChatMenu";
import ProtectedRouting from "./components/utils/ProtectedRouting";

function App() {
  const [planner, setPlanner] = useRecoilState(isPlannerState);
  const isLogin = useRecoilValue(isLoginState);

  const loc = useLocation();

  useEffect(() => {
    if (loc.pathname === "/planner") {
      setPlanner(true);
    } else {
      setPlanner(false);
    }
  }, [loc.pathname]);
  const [chatEl, setChatEl] = useState(null);

  return (
    <>
      {isLogin && <ChatMenu chatEl={chatEl} setChatEl={setChatEl} />}
      <Routes>
        <Route
          path="/planner"
          element={<ProtectedRouting element={<PlannerFrm />} />}
        />
        <Route
          path="*"
          element={
            <div className="wrap">
              <Header />
              <div className="content">
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/join" element={<Join />} />
                  <Route path="/join2" element={<Join2 />} />
                  <Route path="/updatePw" element={<UpdatePw />} />
                  <Route path="/updatePw2" element={<UpdatePw2 />} />
                  <Route path="/review/*" element={<ReviewMain />}></Route>
                  <Route path="/tour" element={<ContentMain />} />
                </Routes>
              </div>
              <Footer />
            </div>
          }
        />
      </Routes>
      {/* {!planner && (
        <div className="wrap">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<Join />} />
              <Route path="/join2" element={<Join2 />} />
              <Route path="/updatePw" element={<UpdatePw />} />
              <Route path="/updatePw2" element={<UpdatePw2 />} />
              <Route path="/review/*" element={<ReviewMain />}></Route>
              <Route path="/tour" element={<ContentMain />} />
              <Route path="/" element={<Main />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )} */}
    </>
  );
}

export default App;
