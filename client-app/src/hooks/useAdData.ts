import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchAdById, clearCurrentItem } from "../store/slices/adsSlice";

export const useAdData = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { currentItem, loading, error } = useAppSelector((state) => state.ads);

    useEffect(() => {
        if (id) {
            dispatch(fetchAdById(id));
        }

        return () => {
            dispatch(clearCurrentItem());
            //dispatch(resetCategory());
        };
    }, [id, dispatch]);

    return { item: currentItem, loading, error };
};