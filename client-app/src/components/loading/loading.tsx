import { Spin } from "antd";
import s from './Loading.module.css';

const Loading = () => {
    return (
        <div className={s.loadingContainer}>
            <Spin />
        </div>
    );
};

export default Loading;
