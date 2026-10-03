import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { SESSION_KEY, getSession } from "@/pages/Login";

const AppConfigContext = createContext({ config: null, loading: true, refresh: async () => {}, save: async () => {} });

export function AppConfigProvider({ children }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await base44.functions.invoke("getConfig", {});
      const data = res && res.data ? res.data : res;
      setConfig(data);
    } catch {
      setConfig(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const save = useCallback(async (next) => {
    await base44.functions.invoke("saveConfig", { ...next, __session: getSession() });
    await refresh();
  }, [refresh]);

  return (
    <AppConfigContext.Provider value={{ config, loading, refresh, save }}>
      {children}
    </AppConfigContext.Provider>
  );
}

export const useAppConfig = () => useContext(AppConfigContext);