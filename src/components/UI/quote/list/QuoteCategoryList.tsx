import styles from '../Quotes.module.css'

import { usePathname } from 'next/navigation';

import QuoteCategoryCard from "../card/QuoteCategoryCard";

interface Item {
    category: string;
    birth: string;
    job: string;
}

interface PropsType {
    items: Item[];
}

export default function QuoteCategoryList({ items }: PropsType) {

    const pathname = usePathname()
    return (
        <ul className={`${styles.grid_container}`}>
            {items.map((item: Item, i) =>
                <QuoteCategoryCard pathname={pathname} key={i} item={item} />
            )}
        </ul>
    );
}