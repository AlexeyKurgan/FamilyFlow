import { GrIntegration } from "../react-icons/icons";

interface IIntegrationIconProps {
  apiIcon: string;
  className?: string;
  width?: string;
  height?: string;
  fill?: string;
  viewBox?: string;
}

const IntegrationIcon = ({
  apiIcon,
  className,
  width,
  height,
  viewBox,
  fill,
}: IIntegrationIconProps) => {
  if (!apiIcon) {
    return <GrIntegration className={className} size={25} />;
  }

  return (
    <>
      <svg
        className={className}
        width={width}
        height={height}
        viewBox={viewBox}
        fill={fill}
        dangerouslySetInnerHTML={{
          __html: apiIcon,
        }}
      />
    </>
  );
};

export default IntegrationIcon;
