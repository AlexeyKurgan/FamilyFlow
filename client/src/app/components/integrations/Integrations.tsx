import styles from "./Integrations.module.scss";
import { MdLink } from "react-icons/md";

export const Integrations = () => {
  return (
    <div className={`app-content ${styles.integrationsContent}`}>
      <section className={styles.integrationHeader}>
        <article className={styles.card}>
          <div className={`flex items-start ${styles.cardIcon}`}>
            <h2 className="mr-5">Family Integrations</h2>
            <MdLink size={48} color="#9b59b6" />
          </div>

          <p>Connect services to enhance family productivity</p>
        </article>
      </section>
      <section className="integration-row">
        <article>1</article>
        <article>2</article>
        <article>3</article>
        <article>4</article>
        <article>5</article>
        <article>6</article>
      </section>
    </div>
  );
};

export default Integrations;
