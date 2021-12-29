import { ipcRenderer } from 'electron';
import React, { useContext, useEffect, useState } from 'react';

const ConfigContext = React.createContext();
export function useConfig() {
  return useContext(ConfigContext);
}

export default function ConfigProvider({ children }) {
  const [config, setConfig] = useState(null);

  async function getConfig() {
    const res = await ipcRenderer.invoke('getConfig');
    setConfig(JSON.parse(res));
  }

  async function updateConfig(newConfig) {
    const res = await ipcRenderer.invoke('updateConfig', newConfig);
    setConfig(JSON.parse(res));
  }

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {config && children}
    </ConfigContext.Provider>
  );
}
