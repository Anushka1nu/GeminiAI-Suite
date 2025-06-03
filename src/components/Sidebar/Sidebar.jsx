/*
import React, { useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";

const Sidebar = () => {
  //state variable
  const [extended, setExtended] = useState(false);

  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={()=> setExtended(prev=>!prev)}className="menu" src={assets.menu_icon} alt="" />
        <div className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            <div className="recent-entry">
              <img src={assets.message_icon} alt="" />
              <p>What is React...</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended?<p>Help</p>:null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended?<p>Activity</p>:null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended?<p>Settings</p>:null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

*/



/*

import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  // State variable to toggle sidebar expansion
  const [extended, setExtended] = useState(false);
  const{onSent, prevPrompts,setRecentPrompts}=useContext(Context)

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        {/* Menu icon toggles sidebar *
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
          style={{ cursor: "pointer" }} // add pointer cursor for clarity
        />

        {/* New Chat button *
        <div className="new-chat" onClick={() => alert("New chat clicked!") /* Optional click handler *
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent chats shown only when extended *
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item,index)=>{
              return(
                <div className="recent-entry">
              <img src={assets.message_icon} alt="Message Icon" />
              <p>{item.slice(0,18)}...</p>
            </div>
              )
            })}
            
          </div>
        )}
      </div>

      <div className="bottom">
        {/* Bottom items *
        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.question_icon} alt="Help Icon" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

*/




/*

import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  // Toggle sidebar open/close
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt } = useContext(Context); // ✅ fixed typo: `setRecentPrompts` -> `setRecentPrompt`

  const loadPrompt=async(prompt)=>{
    setRecentPrompt(prompt)
    await onSent(prompt)
  }

  // ✅ Function to handle selecting a previous prompt
  const handlePromptClick = (prompt) => {
    setRecentPrompt(prompt);
    //onSent(); // Optionally rerun the prompt
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        {/* Sidebar toggle icon *
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
          style={{ cursor: "pointer" }}
        />

        {/* New Chat button *
        <div
          className="new-chat"
          onClick={() => {
            setRecentPrompt("");
          }}
        >
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent chats *
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => (
              <div onClick={()=>loadPrompt(item)}
                className="recent-entry"
                key={index}
                onClick={() => handlePromptClick(item)}
              >
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom icons *
      <div className="bottom">
        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.question_icon} alt="Help Icon" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

*/








/*
import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  // Toggle sidebar open/close
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt } = useContext(Context); // ✅ fixed typo: `setRecentPrompts` -> `setRecentPrompt`

  const loadPrompt=async(input)=>{
    setRecentPrompt(input)
    await onSent(input)
  }

  // ✅ Function to handle selecting a previous prompt
  const handlePromptClick = (prompt) => {
    setRecentPrompt(prompt);
    //onSent(); // Optionally rerun the prompt
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        {/* Sidebar toggle icon *
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
          style={{ cursor: "pointer" }}
        />

        {/* New Chat button *
        <div
          className="new-chat"
          onClick={() => {
            setRecentPrompt("");
          }}
        >
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent chats *
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            
              <div
                className="recent-entry"
                key={index}
                onClick={() => handlePromptClick(item)}
              >
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom icons *
      <div className="bottom">
        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.question_icon} alt="Help Icon" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


*/








/*
import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        {/* Sidebar toggle icon *
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
          style={{ cursor: "pointer" }}
        />

        {/* New Chat button *
        <div onClick={()=>newChat()}
          className="new-chat"
       //   onClick={() => {
        //    setRecentPrompt("");
        //  }}
        >
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent chats *
        {extended ? 
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.map((item, index) => {
              return(
                 <div
                className="recent-entry"
                key={index}
                onClick={() => loadPrompt(item)}
              >
                <img src={assets.message_icon} alt="Message Icon" />
                <p>{item.slice(0, 18)}...</p>
              </div>
              )
              
            })}
          </div>
          :null
}
      </div>

      {/* Bottom icons *
      <div className="bottom">
        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.question_icon} alt="Help Icon" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }}>
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
*/






/*
import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const navigate = useNavigate();

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const handlePromptClick = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt); // Runs the Gemini API again
  };

  const handleNewChat = () => {
    newChat(); // Clears all result/input
  };


  const handleActivityClick = () => {
  window.open("https://mygeminiapp.com/activity", "_blank");
};


  const handleHelpClick = () => {
    window.open("https://deepmind.google/technologies/gemini/", "_blank");
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        {/* Sidebar Toggle Button *
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
          style={{ cursor: "pointer" }}
        />

        {/* New Chat Button *
        <div className="new-chat" onClick={handleNewChat}>
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent Prompts Section *
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.length === 0 ? (
              <p className="recent-entry" style={{ color: "#999" }}>No recent prompts</p>
            ) : (
              prevPrompts.map((item, index) => (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => handlePromptClick(item)}
                >
                  <img src={assets.message_icon} alt="Message Icon" />
                  <p>{item.length > 18 ? item.slice(0, 18) + "..." : item}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Menu *
      <div className="bottom">
        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }} onClick={handleHelpClick}>
          <img src={assets.question_icon} alt="Help Icon" />
          {extended && <p>Help</p>}
        </div>

        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }} onClick={handleActivityClick}>
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended && <p>Activity</p>}
        </div>

        <div className="bottom-item recent-entry" style={{ cursor: "pointer" }} onClick={() => navigate('/login')}>
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}};

export default Sidebar;
*/








import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);
  const navigate = useNavigate();

  const handlePromptClick = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt); // Re-run Gemini API or whatever action
  };

  const handleNewChat = () => {
    newChat(); // Clear chat/input
  };

  const handleHelpClick = () => {
    window.open("https://gemini.google.com/app");
  };

  const handleActivityClick = () => {
    navigate("/activity"); // Redirect to activity/history page
  };

  const handleSettingsClick = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className={`sidebar ${extended ? "extended" : ""}`}>
      <div className="top">
        {/* Sidebar Toggle Button */}
        <img
          onClick={() => setExtended((prev) => !prev)}
          className="menu"
          src={assets.menu_icon}
          alt="Menu Icon"
          style={{ cursor: "pointer" }}
        />

        {/* New Chat Button */}
        <div className="new-chat" onClick={handleNewChat} style={{ cursor: "pointer" }}>
          <img src={assets.plus_icon} alt="Plus Icon" />
          {extended && <p>New Chat</p>}
        </div>

        {/* Recent Prompts Section */}
        {extended && (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {prevPrompts.length === 0 ? (
              <p className="recent-entry" style={{ color: "#999" }}>
                No recent prompts
              </p>
            ) : (
              prevPrompts.map((item, index) => (
                <div
                  className="recent-entry"
                  key={index}
                  onClick={() => handlePromptClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  <img src={assets.message_icon} alt="Message Icon" />
                  <p>{item.length > 18 ? item.slice(0, 18) + "..." : item}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Menu */}
      <div className="bottom">
        <div
          className="bottom-item recent-entry"
          onClick={handleHelpClick}
          style={{ cursor: "pointer" }}
        >
          <img src={assets.question_icon} alt="Help Icon" />
          {extended && <p>Help</p>}
        </div>

        <div
          className="bottom-item recent-entry"
          onClick={handleActivityClick}
          style={{ cursor: "pointer" }}
        >
          <img src={assets.history_icon} alt="Activity Icon" />
          {extended && <p>Activity</p>}
        </div>

        <div
          className="bottom-item recent-entry"
          onClick={handleSettingsClick}
          style={{ cursor: "pointer" }}
        >
          <img src={assets.setting_icon} alt="Settings Icon" />
          {extended && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
