const OS = require("opensubtitles-api");
const OpenSubtitles = new OS({
  useragent: "NachoTime",
  ssl: true,
});

class OpenSubtitlesProvider {
  static async getAllSubtitlesOfLanguage(imdbid, language) {
    try {
      let sublang = await OpenSubtitles.api.GetSubLanguages(language);
      sublang = sublang.data.find((lang) => lang.ISO639 === language);
      if (!sublang) {
        return {
          subtitles: [],
          error: "Invalid language code",
        };
      }
      sublang = sublang.SubLanguageID;
      const result = await OpenSubtitles.search({
        sublanguageid: sublang,
        imdbid: imdbid,
        limit: "all",
      });
      let subtitles = result[language].map((subtitle) => ({
        langcode: subtitle.langcode,
        lang: subtitle.lang,
        vtt: subtitle.vtt,
        utf8: subtitle.utf8,
        encoding: subtitle.encoding,
      }));
      return {
        subtitles: subtitles,
        error: null,
      };
    } catch (error) {
      return {
        error: error.message,
        subtitles: [],
      };
    }
  }

  static async getAllSubtitles(imdbid) {
    try {
      const result = await OpenSubtitles.search({
        sublanguageid: "all",
        imdbid: imdbid,
        limit: "best",
      });
      console.log(result);
      let subtitles = Object.values(result).map((subtitle) => ({
        langcode: subtitle.langcode,
        lang: subtitle.lang,
        vtt: subtitle.vtt,
        utf8: subtitle.utf8,
        encoding: subtitle.encoding,
      }));
      return {
        subtitles: subtitles,
        error: null,
      };
    } catch (error) {
      return {
        error: error.message,
        subtitles: [],
      };
    }
  }
}

module.exports = OpenSubtitlesProvider;
