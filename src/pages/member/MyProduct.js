import { useState, useContext } from 'react';
import { useMediaQuery, Grid } from '@mui/material';
import { ItemLayout } from './accountLayout';
import Links, { ButtonLink } from '../../components/Links';
import { GlobalContext } from '../../context/global.state';
import util from '../../utils/util';
import Service from '../../utils/util.service';

const { formatBytes, arrangeFormatAndRender } = util;

// 項目
const Item = ({
    data: {
        id,
        title,
        imgUrl,
        fileSize,
        models,
    },
}) => {

    // Context
    const { deftags } = useContext(GlobalContext);

    // Hook
    const matches = useMediaQuery((theme) => theme.breakpoints.up('lg'));
    const options = arrangeFormatAndRender(models);

    // State
    const [format, setFormat] = useState('');
    const [selected, setSelected] = useState({});
    const [download, setDownload] = useState('');

    // 軟體格式 + 算圖引擎
    const handleSelected = ({ target: { name, value } }, productId) => {

        // 暫存給畫面用
        const storage = {
            [productId]: {
                ...selected[productId],
                [name]: +value,
            },
        };

        setSelected({ ...storage });
        if (name === 'formatId') {

            setFormat(value);
            storage[productId].rendererId = 0;

        }

        if (name === 'rendererId') {

            Service.donwloadLink({
                productId,
                formatId: storage[productId].formatId,
                rendererId: storage[productId].rendererId,
            })
            .then(({ url }) => setDownload(url));

        }

    };

    return (

        <ItemLayout title={title}>
            <Links
                url={`/product/${id}`}
                className="item-thumb"
                newPage
            >
                <img
                    src={imgUrl}
                    alt={title}
                    width="378"
                    height="239"
                />
            </Links>

            <div className="item-content">
                <h3 className="title web-line-clamp">{title}</h3>
                <span className="file-size">{deftags.product_file_size}: {formatBytes(fileSize)}</span>

                {
                    // 手機版不支援下載
                    matches &&
                        <div className="downloadWrap">
                            <div className="options" onClick={(e) => e.preventDefault()}>
                                <select
                                    name="formatId"
                                    onChange={(e) => handleSelected(e, id)}
                                >
                                    <option value="">{deftags.product_format}</option>
                                    {
                                        Object.keys(options).map((formatId) => (

                                            <option
                                                key={formatId}
                                                value={formatId}
                                            >
                                                {options[formatId].name}
                                            </option>

                                        ))
                                    }
                                </select>

                                <select
                                    name="rendererId"
                                    onChange={(e) => handleSelected(e, id)}
                                    value={selected[id]?.rendererId}
                                >
                                    <option value="">{deftags.product_render}</option>
                                    {
                                        options[format]?.renders.map(({ rendererId, rendererName }) => (

                                            <option key={rendererId} value={rendererId}>{rendererName}</option>

                                        ))
                                    }
                                </select>
                            </div>
                            <ButtonLink
                                url={selected[id]?.rendererId ? download : ''}
                                text={deftags.product_download}
                                className={`btn-download ${selected[id]?.rendererId ? '' : 'disabled'}`}
                            />
                        </div>
                }
            </div>
        </ItemLayout>

    );

};

//
const MyProduct = ({ data }) => (

    <Grid
        container
        className="container"
        spacing="30px"
    >
        {
            data.map((obj) => (

                <Grid
                    key={obj.id}
                    item
                    xs={12}
                    middle={6}
                    mobile={4}
                >
                    <Item data={obj} />
                </Grid>

            ))
        }
    </Grid>

);

export default MyProduct;
