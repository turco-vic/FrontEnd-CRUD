import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
    return (
            <div className={styles.container}>
            <h1>CRUD Completo</h1>
            <nav>
                <Link href="/get">GET</Link>
                <br />
                <Link href="/post">POST</Link>
                <br />
                <Link href="/edit">EDIT</Link>
                <br />
                <Link href="/delete">DELETE</Link>
            </nav>
        </div>
    );
}
