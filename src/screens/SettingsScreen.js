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

	return (
		<div className="SettingsScreenContainer">
			Settings
			<div className="SettingContainer">
				<label className="FolderSelectLabel">
					Torrent's Download location:
				</label>
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
