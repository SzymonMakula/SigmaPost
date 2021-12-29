import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';

import { useConfig } from 'renderer/context/config';
import defaultSettings from 'renderer/settings/settings';
import styled from 'styled-components';
import { SelectButton } from '../General/Buttons/GeneralButtons';
import { FlexColumn, FlexRow } from '../General/Flex';

const CloseSettingsButton = styled.button`
  display: flex;
  right: 0;
  top: 0;
  margin: 10px 10px 0px auto;
  background-color: inherit;
  position: absolute;
  color: black;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  ::before {
    position: absolute;
    content: ' ';
    width: 80%;
    border: 1px ${({ theme: { color } }) => color.orange} solid;
    height: 2px;
    transform: rotate(45deg);
  }

  ::after {
    position: absolute;
    content: ' ';
    width: 80%;
    border: 1px ${({ theme: { color } }) => color.orange} solid;
    color: black;
    transform: rotate(-45deg);
  }
`;
const SettingsContainer = styled(FlexColumn)`
  width: auto;
  height: 100%;
  background-color: ${({ theme: { color } }) => color.backgroundBlack};
`;

const SettingsHeader = styled(FlexRow)`
  margin: 20px 0 20px 0;
  justify-content: center;
  align-items: center;
`;
const HeaderDescription = styled.p`
  margin: 0;
  padding: 0 10% 5px 10%;
  font-size: 22px;
`;
const GeneralSettingsContainer = styled(FlexColumn)`
  position: relative;
  padding: 20px 0px 20px 40px;
  width: 100%;
  height: auto;
`;

const SettingItem = styled.div`
  display: flex;

  font-size: 20px;
  width: 50%;
  padding: 0 15px 30px 15px;
`;

const SettingCheckboxContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 30px;
  min-width: 30px;
  height: 30px;
  min-height: 30px;
  margin-right: 12px;
`;
const SettingCheckbox = styled.input`
  width: 100%;
  height: 100%;
`;

const CheckboxCheckmark = styled.div`
  border: 2px grey solid;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme: { color } }) => color.backgroundGrey};
  display: flex;
  justify-content: center;
  align-items: center;

  ::before {
    position: absolute;
    left: 4px;
    bottom: 30%;
    transform: rotate(45deg);
    content: ' ';

    width: 40%;
    height: 1px;
    border: ${({ isChecked, theme: { color } }) =>
      isChecked && `2px ${color.orange} solid`};
  }
  }
  ::after {
    position: absolute;
    left: 33%;
    bottom: 40%;
    transform: rotate(135deg);
    content: ' ';

    width: 60%;
    height: 1px;
    border: ${({ isChecked, theme: { color } }) =>
      isChecked && `2px ${color.orange} solid`};
  }
`;

const SettingDescription = styled.p`
  color: ${({ isChecked, theme: { color } }) =>
    isChecked ? color.orange : 'grey'};
  margin: 0;
`;

const AcceptButton = styled(SelectButton)`
  width: 60%;
  margin-top: auto;
  margin-bottom: 20px;
  align-self: center;
`;

const CustomModal = styled(Modal)`
  justify-content: center;
  align-items: center;
  display: flex !important;
  div {
    background-color: ${({ theme: { color } }) => color.backgroundGrey};
  }
`;

const CustomModalHeader = styled(Modal.Header)`
  button {
    width: 35px;
    height: 35px;
  }
`;

export default function SettingsScreen() {
  const history = useHistory();
  const { config, updateConfig } = useConfig();
  const settings = Object.entries(defaultSettings).map(([key, values]) => ({
    ...values,
    id: key,
    active: config[key],
  }));

  const [showModal, setShowModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [currentSettings, setCurrentSettings] = useState(settings);
  const [loading, setLoading] = useState(null);

  const closeModal = () => {
    setShowModal(false);
  };

  function handleQuit() {
    if (
      hasChanges &&
      currentSettings.some(({ active, id }) => active !== config[id])
    ) {
      setShowModal(true);
      return;
    }
    setHasChanges(false);
    history.push('/');
  }

  function handleSettingSelect(setting) {
    setting.active = !setting.active;
    setHasChanges(true);
    setCurrentSettings([...currentSettings]);
  }

  async function applySettings() {
    setLoading(true);
    const newConfig = {};
    currentSettings.forEach((setting) => {
      newConfig[setting.id] = setting.active;
    });
    await updateConfig(JSON.stringify(newConfig));
    setLoading(false);
    setHasChanges(false);
  }

  return (
    <SettingsContainer>
      <CustomModal show={showModal} onHide={closeModal} animation={false}>
        <CustomModalHeader>
          <CloseSettingsButton onClick={closeModal} />
          <Modal.Title>Unsaved Changes</Modal.Title>
        </CustomModalHeader>
        <Modal.Body>
          You have unsaved setting changes. Do you want to save your changes
          before quiting?
        </Modal.Body>
        <Modal.Footer>
          <SelectButton onClick={() => history.push('/')}>
            Quit without saving
          </SelectButton>
          <SelectButton
            onClick={async () => {
              await applySettings();
              history.push('/');
            }}
          >
            Save Changes
          </SelectButton>
        </Modal.Footer>
      </CustomModal>
      <SettingsHeader>
        <HeaderDescription>General Settings</HeaderDescription>
        <CloseSettingsButton disabled={loading} onClick={() => handleQuit()} />
      </SettingsHeader>
      <GeneralSettingsContainer>
        {currentSettings.map((setting) => (
          <SettingItem key={setting.name}>
            <SettingCheckboxContainer>
              <SettingCheckbox type="checkbox" />
              <CheckboxCheckmark
                isChecked={setting.active}
                onClick={() => handleSettingSelect(setting)}
              />
            </SettingCheckboxContainer>
            <SettingDescription isChecked={setting.isChecked}>
              {setting.name}
            </SettingDescription>
          </SettingItem>
        ))}
      </GeneralSettingsContainer>
      <AcceptButton disabled={!hasChanges} onClick={() => applySettings()}>
        Apply
      </AcceptButton>
    </SettingsContainer>
  );
}
