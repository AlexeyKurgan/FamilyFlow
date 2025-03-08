import { GrIntegration } from "../react-icons/icons";

interface ISvgIconProps {
  apiIcon: string;
  className?: string;
  width?: string;
  height?: string;
  fill?: string;
  viewBox?: string;
}

const SvgIcon = ({
  apiIcon,
  className,
  width,
  height,
  viewBox,
  fill,
}: ISvgIconProps) => {
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

export default SvgIcon;
