import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Player, ControlBar, ClosedCaptionButton } from "video-react";

import OpenSubtitlesProvider from "../lib/providers/subtitles/opensubtitles";

import "video-react/dist/video-react.css";

const PlayerScreen = () => {
  let { filePath, imdbid, langcode } = useParams();
  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    const fetchSubtitles = async () => {
      if (!imdbid || !langcode) return;
      const result = await OpenSubtitlesProvider.getAllSubtitlesOfLanguage(
        imdbid,
        langcode
      );
      console.log(result.subtitles.length);
      setSubtitles(result.subtitles);
    };
    fetchSubtitles();
  }, [imdbid, langcode]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Player height="100%" fluid={false} autoPlay>
        <source src={`file://${decodeURIComponent(filePath)}`} />
        {subtitles.length > 0 &&
          subtitles.map((subtitle, index) => (
            <track
              key={index}
              kind="subtitles"
              src={subtitle.vtt}
              srcLang={subtitle.langcode}
              label={`${subtitle.lang} ${index + 1}`}
            />
          ))}
        <ControlBar autoHide>
          <ClosedCaptionButton order={subtitles.length} />
        </ControlBar>
      </Player>
    </div>
  );
};

export default PlayerScreen;
