import { Navigate, useParams } from "react-router-dom";
import ConfiguratorEngine from "@/components/konfigurator/ConfiguratorEngine";
import { configurators } from "@/data/configurators";

const KonfiguratorRoute = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  if (!categorySlug) return <Navigate to="/konfigurator" replace />;

  const config = configurators[categorySlug];
  if (!config) return <Navigate to="/konfigurator" replace />;

  return <ConfiguratorEngine config={config} />;
};

export default KonfiguratorRoute;
