import styles from "./Card.module.scss";

interface ICardProps {
  className?: string;
  children: React.ReactNode;
}

const Card = ({ children, className }: ICardProps) => {
  return (
    <>
      <article className={`${styles.card} ${className}`}>{children}</article>
    </>
  );
};

export default Card;
