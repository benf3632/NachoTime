import { connect } from "react-redux";
import { AiFillFolderOpen } from "react-icons/ai";

// actions
import { setSetting } from "../actions/settings";

// css
import "./SettingsScreen.css";

// electron
const { ipcRenderer } = window.require("electron");

const SettingsScreen = ({ settings, setSetting }) => {
  const handleFolderSelectDialog = async (currentPath, settingName) => {
    const selectedFolder = await ipcRenderer.invoke(
      "select-folder",
      currentPath
    );
    if (selectedFolder.canceled) return;
    setSetting(settingName, selectedFolder.filePaths[0]);
  };

  const handleFileSelectDialog = async (currentPath, settingName) => {
    const selectedFilePath = await ipcRenderer.invoke(
      "select-file",
      currentPath
    );
    if (selectedFilePath.canceled) return;
    setSetting(settingName, selectedFilePath.filePaths[0]);
  };

  return (
    <div className="SettingsScreenContainer">
      <span className="SettingsScreenTitle">Settings</span>
      <div className="SettingsContainer">
        <hr />
        <div className="SettingsSection">
          <span className="SettingsSectionTitle">General</span>
          <div className="Setting">
            <label className="SettingLabel">Torrent's Download Path:</label>
            <div className="FolderInput">
              <div
                className="FolderPath"
                onClick={() =>
                  handleFolderSelectDialog(
                    settings.torrentsDownloadPath,
                    "torrentsDownloadPath"
                  )
                }
              >
                {settings.torrentsDownloadPath}
              </div>
              <AiFillFolderOpen
                onClick={() =>
                  handleFolderSelectDialog(
                    settings.torrentsDownloadPath,
                    "torrentsDownloadPath"
                  )
                }
                className="FolderIcon"
              />
            </div>
          </div>
          <div className="Setting">
            <label className="SettingLabel">VLC Path:</label>
            <div className="FolderInput">
              <div
                className="FolderPath"
                onClick={() =>
                  handleFileSelectDialog(settings.vlcPath ?? "", "vlcPath")
                }
              >
                {settings.vlcPath ?? ""}
              </div>
              <AiFillFolderOpen
                onClick={() =>
                  handleFileSelectDialog(settings.vlcPath ?? "", "vlcPath")
                }
                className="FolderIcon"
              />
            </div>
          </div>
          <hr />
        </div>
        {/* <div className="SettingsSection">
          <span className="SettingsSectionTitle">OpenSubtitles</span>
          <div className="Setting">
            <label className="SettingLabel">Usernme: </label>
          </div>
          <hr />
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapDispatchToProps = (dispatch) => ({
  setSetting: (settingName, settingValue) =>
    dispatch(setSetting(settingName, settingValue)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
