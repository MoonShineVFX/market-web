import { useContext } from 'react';
import { GlobalContext } from '../context/global.state';

const EmptyMesg = () => {

    // Context
    const { deftags } = useContext(GlobalContext);
    return <p>{deftags.member_no_data}</p>;

};

export default EmptyMesg;
