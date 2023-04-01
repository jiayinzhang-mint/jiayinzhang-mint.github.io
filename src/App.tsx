import { useCallback, useEffect, useMemo, useState } from "react";

import "./App.css";
import GitHubLogo from "./assets/github.svg";
import LinkedLogo from "./assets/linkedin.svg";
import OrcidLogo from "./assets/orcid.svg";
import Papers from "./components/Papers";
import Profile from "./components/Profile";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="App">
      <main>
        <div className="header">
          <Name />
          <Social />
        </div>
        <hr />
        <div className="content">
          <Tabs />
        </div>
      </main>
    </div>
  );
}

export default App;

function Social() {
  return (
    <div className="sec-contact">
      <SocialItem
        link="https://github.com/jiayinzhang-mint"
        logo={GitHubLogo}
        name="GitHub"
      />
      <SocialItem
        link="https://www.linkedin.com/in/嘉寅-张-769389146/"
        logo={LinkedLogo}
        name="Linkedin"
      />
      <SocialItem
        link="https://orcid.org/0000-0002-3543-762X"
        logo={OrcidLogo}
        name="ORCID"
      />
    </div>
  );
}

function Name() {
  return (
    <div className="sec-name">
      <h1>Jiayin Zhang</h1>
      <h3>Designer & Full-stack Engineer</h3>
    </div>
  );
}

function Tabs() {
  const [hash, setHash] = useHash();

  const items = [
    { name: "Profile", link: "#profile", component: <Profile /> },
    { name: "Projects", link: "#projects", component: <Projects /> },
    { name: "Papers", link: "#papers", component: <Papers /> },
  ];

  const activeItem = useMemo(() => items.find((e) => e.link === hash), [hash]);

  useEffect(() => {
    if (!activeItem) setHash(items[0].link);
  }, [setHash]);

  return (
    <>
      <ul className="tabs">
        {items.map((e, i) => (
          <li
            key={`tab-${i}`}
            className={`tab-item ${hash === e.link ? `tab-item-active` : ``}`}
          >
            <a className="tab-item-link" href={e.link}>
              {e.name}
            </a>
          </li>
        ))}
      </ul>

      {activeItem && <div className="tab-content">{activeItem.component}</div>}
    </>
  );
}

function SocialItem(props: { link: string; logo: string; name: string }) {
  return (
    <div className="social-item">
      <div className="social-logo-wrapper">
        <img src={props.logo} className="social-logo" alt="Github Link" />

        {/* show if the above <a></a> is hovered */}
        <a
          className={`social-${props.name}-hover social-logo-hover`}
          href={props.link}
          target="_blank"
        >
          <div>{props.name}</div>
        </a>
      </div>
    </div>
  );
}

const useHash = (): [string, (v: string) => void] => {
  const [hash, setHash] = useState(() => window.location.hash);

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    window.addEventListener("hashchange", hashChangeHandler);
    return () => {
      window.removeEventListener("hashchange", hashChangeHandler);
    };
  }, []);

  const updateHash = useCallback(
    (newHash: string) => {
      if (newHash !== hash) window.location.hash = newHash;
    },
    [hash]
  );

  return [hash, updateHash];
};
