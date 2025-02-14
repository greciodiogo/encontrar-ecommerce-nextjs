import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from '../../styles/Breadcrumb.module.css'; // Estilo separado em um arquivo CSS

export const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.pathname.split('/').filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return { label: segment.replace(/-/g, ' ').toUpperCase(), href };
  });

  return (
    <nav aria-label="breadcrumb" className={styles.breadcrumbNav}>
      <ol className={styles.breadcrumbList}>
        <li className={styles.breadcrumbItem}>
          <i>
            <img src="/assets_ecommerce/svg/House.png" alt="" />
          </i>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <span className={styles.separator}>
            <i>
              <img src="/assets_ecommerce/svg/CaretRight.png" alt="" />
            </i>
          </span>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={index} className={styles.breadcrumbItem}>
            {index < breadcrumbs.length - 1 ? (
              <Link href={crumb.href} className={styles.link}>
                {crumb.label}
              </Link>
            ) : (
              <span className={styles.active}>{crumb.label}</span>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className={styles.separator}>
                <i>
                  <img src="/assets_ecommerce/svg/CaretRight.png" alt="" />
                </i>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
