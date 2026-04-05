import { Divider } from 'antd';
import s from './ItemsLayout.module.css';
import {AppstoreOutlined, UnorderedListOutlined }from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setViewMode } from '../../store/slices/adsSlice';

const ItemsLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const viewMode = useAppSelector(state => state.ads.viewMode);

    return (
        <div className={s['layout-wrapper']}>
            <AppstoreOutlined  
                className={`${s['item']} ${viewMode === 'grid' ? s.activeIt : ''}`} 
                onClick={() => dispatch(setViewMode('grid'))}
            />
            <Divider orientation="vertical" style={{ height: 'auto', borderWidth: '1.3px', borderColor: 'white' }} />
			<UnorderedListOutlined 
                className={`${s['item']} ${viewMode === 'virtual' ? s.activeIt : ''}`}
                onClick={() => dispatch(setViewMode('virtual'))}
            />
        </div>
    ) 
} 

export default ItemsLayout;