import { useCallback, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    TextField,
    Unstable_Grid2 as Grid,
    Snackbar,
    Backdrop,
    CircularProgress
} from '@mui/material';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { Stack } from '@mui/system';
import dayjs from 'dayjs';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../contexts/firebase';
import { calculateWinningPoints } from '../../utils/winning-points';

const session = [
    {
        value: '',
        label: ''
    },
    {
        value: 'open',
        label: 'Open'
    },
    {
        value: 'close',
        label: 'Close'
    },
];
const states = [
    {
        value: '',
        label: '',
    },
    {
        value: "000",
        label: "000"
    },
    {
        value: "100",
        label: "100"
    },
    {
        value: "110",
        label: "110"
    },
    {
        value: "111",
        label: "111"
    },
    {
        value: "112",
        label: "112"
    },
    {
        value: "113",
        label: "113"
    },
    {
        value: "114",
        label: "114"
    },
    {
        value: "115",
        label: "115"
    },
    {
        value: "116",
        label: "116"
    },
    {
        value: "117",
        label: "117"
    },
    {
        value: "118",
        label: "118"
    },
    {
        value: "119",
        label: "119"
    },
    {
        value: "120",
        label: "120"
    },
    {
        value: "122",
        label: "122"
    },
    {
        value: "123",
        label: "123"
    },
    {
        value: "124",
        label: "124"
    },
    {
        value: "125",
        label: "125"
    },
    {
        value: "126",
        label: "126"
    },
    {
        value: "127",
        label: "127"
    },
    {
        value: "128",
        label: "128"
    },
    {
        value: "129",
        label: "129"
    },
    {
        value: "130",
        label: "130"
    },
    {
        value: "133",
        label: "133"
    },
    {
        value: "134",
        label: "134"
    },
    {
        value: "135",
        label: "135"
    },
    {
        value: "136",
        label: "136"
    },
    {
        value: "137",
        label: "137"
    },
    {
        value: "138",
        label: "138"
    },
    {
        value: "139",
        label: "139"
    },
    {
        value: "140",
        label: "140"
    },
    {
        value: "144",
        label: "144"
    },
    {
        value: "145",
        label: "145"
    },
    {
        value: "146",
        label: "146"
    },
    {
        value: "147",
        label: "147"
    },
    {
        value: "148",
        label: "148"
    },
    {
        value: "149",
        label: "149"
    },
    {
        value: "150",
        label: "150"
    },
    {
        value: "155",
        label: "155"
    },
    {
        value: "156",
        label: "156"
    },
    {
        value: "157",
        label: "157"
    },
    {
        value: "158",
        label: "158"
    },
    {
        value: "159",
        label: "159"
    },
    {
        value: "160",
        label: "160"
    },
    {
        value: "166",
        label: "166"
    },
    {
        value: "167",
        label: "167"
    },
    {
        value: "168",
        label: "168"
    },
    {
        value: "169",
        label: "169"
    },
    {
        value: "170",
        label: "170"
    },
    {
        value: "177",
        label: "177"
    },
    {
        value: "178",
        label: "178"
    },
    {
        value: "179",
        label: "179"
    },
    {
        value: "180",
        label: "180"
    },
    {
        value: "188",
        label: "188"
    },
    {
        value: "189",
        label: "189"
    },
    {
        value: "190",
        label: "190"
    },
    {
        value: "199",
        label: "199"
    },
    {
        value: "200",
        label: "200"
    },
    {
        value: "220",
        label: "220"
    },
    {
        value: "222",
        label: "222"
    },
    {
        value: "223",
        label: "223"
    },
    {
        value: "224",
        label: "224"
    },
    {
        value: "225",
        label: "225"
    },
    {
        value: "226",
        label: "226"
    },
    {
        value: "227",
        label: "227"
    },
    {
        value: "228",
        label: "228"
    },
    {
        value: "229",
        label: "229"
    },
    {
        value: "230",
        label: "230"
    },
    {
        value: "233",
        label: "233"
    },
    {
        value: "234",
        label: "234"
    },
    {
        value: "235",
        label: "235"
    },
    {
        value: "236",
        label: "236"
    },
    {
        value: "237",
        label: "237"
    },
    {
        value: "238",
        label: "238"
    },
    {
        value: "239",
        label: "239"
    },
    {
        value: "240",
        label: "240"
    },
    {
        value: "244",
        label: "244"
    },
    {
        value: "245",
        label: "245"
    },
    {
        value: "246",
        label: "246"
    },
    {
        value: "247",
        label: "247"
    },
    {
        value: "248",
        label: "248"
    },
    {
        value: "249",
        label: "249"
    },
    {
        value: "250",
        label: "250"
    },
    {
        value: "255",
        label: "255"
    },
    {
        value: "256",
        label: "256"
    },
    {
        value: "257",
        label: "257"
    },
    {
        value: "258",
        label: "258"
    },
    {
        value: "259",
        label: "259"
    },
    {
        value: "260",
        label: "260"
    },
    {
        value: "266",
        label: "266"
    },
    {
        value: "267",
        label: "267"
    },
    {
        value: "268",
        label: "268"
    },
    {
        value: "269",
        label: "269"
    },
    {
        value: "270",
        label: "270"
    },
    {
        value: "277",
        label: "277"
    },
    {
        value: "278",
        label: "278"
    },
    {
        value: "279",
        label: "279"
    },
    {
        value: "280",
        label: "280"
    },
    {
        value: "288",
        label: "288"
    },
    {
        value: "289",
        label: "289"
    },
    {
        value: "290",
        label: "290"
    },
    {
        value: "299",
        label: "299"
    },
    {
        value: "300",
        label: "300"
    },
    {
        value: "330",
        label: "330"
    },
    {
        value: "333",
        label: "333"
    },
    {
        value: "334",
        label: "334"
    },
    {
        value: "335",
        label: "335"
    },
    {
        value: "336",
        label: "336"
    },
    {
        value: "337",
        label: "337"
    },
    {
        value: "338",
        label: "338"
    },
    {
        value: "339",
        label: "339"
    },
    {
        value: "340",
        label: "340"
    },
    {
        value: "344",
        label: "344"
    },
    {
        value: "345",
        label: "345"
    },
    {
        value: "346",
        label: "346"
    },
    {
        value: "347",
        label: "347"
    },
    {
        value: "348",
        label: "348"
    },
    {
        value: "349",
        label: "349"
    },
    {
        value: "350",
        label: "350"
    },
    {
        value: "355",
        label: "355"
    },
    {
        value: "356",
        label: "356"
    },
    {
        value: "357",
        label: "357"
    },
    {
        value: "358",
        label: "358"
    },
    {
        value: "359",
        label: "359"
    },
    {
        value: "360",
        label: "360"
    },
    {
        value: "366",
        label: "366"
    },
    {
        value: "367",
        label: "367"
    },
    {
        value: "368",
        label: "368"
    },
    {
        value: "369",
        label: "369"
    },
    {
        value: "370",
        label: "370"
    },
    {
        value: "377",
        label: "377"
    },
    {
        value: "378",
        label: "378"
    },
    {
        value: "379",
        label: "379"
    },
    {
        value: "380",
        label: "380"
    },
    {
        value: "388",
        label: "388"
    },
    {
        value: "389",
        label: "389"
    },
    {
        value: "390",
        label: "390"
    },
    {
        value: "399",
        label: "399"
    },
    {
        value: "400",
        label: "400"
    },
    {
        value: "440",
        label: "440"
    },
    {
        value: "444",
        label: "444"
    },
    {
        value: "445",
        label: "445"
    },
    {
        value: "446",
        label: "446"
    },
    {
        value: "447",
        label: "447"
    },
    {
        value: "448",
        label: "448"
    },
    {
        value: "449",
        label: "449"
    },
    {
        value: "450",
        label: "450"
    },
    {
        value: "455",
        label: "455"
    },
    {
        value: "456",
        label: "456"
    },
    {
        value: "457",
        label: "457"
    },
    {
        value: "458",
        label: "458"
    },
    {
        value: "459",
        label: "459"
    },
    {
        value: "460",
        label: "460"
    },
    {
        value: "466",
        label: "466"
    },
    {
        value: "467",
        label: "467"
    },
    {
        value: "468",
        label: "468"
    },
    {
        value: "469",
        label: "469"
    },
    {
        value: "470",
        label: "470"
    },
    {
        value: "477",
        label: "477"
    },
    {
        value: "478",
        label: "478"
    },
    {
        value: "479",
        label: "479"
    },
    {
        value: "480",
        label: "480"
    },
    {
        value: "488",
        label: "488"
    },
    {
        value: "489",
        label: "489"
    },
    {
        value: "490",
        label: "490"
    },
    {
        value: "499",
        label: "499"
    },
    {
        value: "500",
        label: "500"
    },
    {
        value: "550",
        label: "550"
    },
    {
        value: "555",
        label: "555"
    },
    {
        value: "556",
        label: "556"
    },
    {
        value: "557",
        label: "557"
    },
    {
        value: "558",
        label: "558"
    },
    {
        value: "559",
        label: "559"
    },
    {
        value: "560",
        label: "560"
    },
    {
        value: "566",
        label: "566"
    },
    {
        value: "567",
        label: "567"
    },
    {
        value: "568",
        label: "568"
    },
    {
        value: "569",
        label: "569"
    },
    {
        value: "570",
        label: "570"
    },
    {
        value: "577",
        label: "577"
    },
    {
        value: "578",
        label: "578"
    },
    {
        value: "579",
        label: "579"
    },
    {
        value: "580",
        label: "580"
    },
    {
        value: "588",
        label: "588"
    },
    {
        value: "589",
        label: "589"
    },
    {
        value: "590",
        label: "590"
    },
    {
        value: "599",
        label: "599"
    },
    {
        value: "600",
        label: "600"
    },
    {
        value: "660",
        label: "660"
    },
    {
        value: "666",
        label: "666"
    },
    {
        value: "667",
        label: "667"
    },
    {
        value: "668",
        label: "668"
    },
    {
        value: "669",
        label: "669"
    },
    {
        value: "670",
        label: "670"
    },
    {
        value: "677",
        label: "677"
    },
    {
        value: "678",
        label: "678"
    },
    {
        value: "679",
        label: "679"
    },
    {
        value: "680",
        label: "680"
    },
    {
        value: "688",
        label: "688"
    },
    {
        value: "689",
        label: "689"
    },
    {
        value: "690",
        label: "690"
    },
    {
        value: "699",
        label: "699"
    },
    {
        value: "700",
        label: "700"
    },
    {
        value: "770",
        label: "770"
    },
    {
        value: "777",
        label: "777"
    },
    {
        value: "778",
        label: "778"
    },
    {
        value: "779",
        label: "779"
    },
    {
        value: "780",
        label: "780"
    },
    {
        value: "788",
        label: "788"
    },
    {
        value: "789",
        label: "789"
    },
    {
        value: "790",
        label: "790"
    },
    {
        value: "799",
        label: "799"
    },
    {
        value: "800",
        label: "800"
    },
    {
        value: "880",
        label: "880"
    },
    {
        value: "888",
        label: "888"
    },
    {
        value: "889",
        label: "889"
    },
    {
        value: "890",
        label: "890"
    },
    {
        value: "899",
        label: "899"
    },
    {
        value: "900",
        label: "900"
    },
    {
        value: "990",
        label: "990"
    },
    {
        value: "999",
        label: "999"
    }
];
const data = {
    "": '',
    "000": 0,
    "100": 1,
    "110": 2,
    "111": 3,
    "112": 4,
    "113": 5,
    "114": 6,
    "115": 7,
    "116": 8,
    "117": 9,
    "118": 0,
    "119": 1,
    "120": 3,
    "122": 5,
    "123": 6,
    "124": 7,
    "125": 8,
    "126": 9,
    "127": 0,
    "128": 1,
    "129": 2,
    "130": 4,
    "133": 7,
    "134": 8,
    "135": 9,
    "136": 0,
    "137": 1,
    "138": 2,
    "139": 3,
    "140": 5,
    "144": 9,
    "145": 0,
    "146": 1,
    "147": 2,
    "148": 3,
    "149": 4,
    "150": 6,
    "155": 1,
    "156": 2,
    "157": 3,
    "158": 4,
    "159": 5,
    "160": 7,
    "166": 3,
    "167": 4,
    "168": 5,
    "169": 6,
    "170": 8,
    "177": 5,
    "178": 6,
    "179": 7,
    "180": 9,
    "188": 7,
    "189": 8,
    "190": 0,
    "199": 9,
    "200": 2,
    "220": 4,
    "222": 6,
    "223": 7,
    "224": 8,
    "225": 9,
    "226": 0,
    "227": 1,
    "228": 2,
    "229": 3,
    "230": 5,
    "233": 8,
    "234": 9,
    "235": 0,
    "236": 1,
    "237": 2,
    "238": 3,
    "239": 4,
    "240": 6,
    "244": 0,
    "245": 1,
    "246": 2,
    "247": 3,
    "248": 4,
    "249": 5,
    "250": 7,
    "255": 2,
    "256": 3,
    "257": 4,
    "258": 5,
    "259": 6,
    "260": 8,
    "266": 4,
    "267": 5,
    "268": 6,
    "269": 7,
    "270": 9,
    "277": 6,
    "278": 7,
    "279": 8,
    "280": 0,
    "288": 8,
    "289": 9,
    "290": 1,
    "299": 0,
    "300": 3,
    "330": 6,
    "333": 9,
    "334": 0,
    "335": 1,
    "336": 2,
    "337": 3,
    "338": 4,
    "339": 5,
    "340": 7,
    "344": 1,
    "345": 2,
    "346": 3,
    "347": 4,
    "348": 5,
    "349": 6,
    "350": 8,
    "355": 3,
    "356": 4,
    "357": 5,
    "358": 6,
    "359": 7,
    "360": 9,
    "366": 5,
    "367": 6,
    "368": 7,
    "369": 8,
    "370": 0,
    "377": 7,
    "378": 8,
    "379": 9,
    "380": 1,
    "388": 9,
    "389": 0,
    "390": 2,
    "399": 1,
    "400": 4,
    "440": 8,
    "444": 2,
    "445": 3,
    "446": 4,
    "447": 5,
    "448": 6,
    "449": 7,
    "450": 9,
    "455": 4,
    "456": 5,
    "457": 6,
    "458": 7,
    "459": 8,
    "460": 0,
    "466": 6,
    "467": 7,
    "468": 8,
    "469": 9,
    "470": 1,
    "477": 8,
    "478": 9,
    "479": 0,
    "480": 2,
    "488": 0,
    "489": 1,
    "490": 3,
    "499": 2,
    "500": 5,
    "550": 0,
    "555": 5,
    "556": 6,
    "557": 7,
    "558": 8,
    "559": 9,
    "560": 1,
    "566": 7,
    "567": 8,
    "568": 9,
    "569": 0,
    "570": 2,
    "577": 9,
    "578": 0,
    "579": 1,
    "580": 3,
    "588": 1,
    "589": 2,
    "590": 4,
    "599": 3,
    "600": 6,
    "660": 2,
    "666": 8,
    "667": 9,
    "668": 0,
    "669": 1,
    "670": 3,
    "677": 0,
    "678": 1,
    "679": 2,
    "680": 4,
    "688": 2,
    "689": 3,
    "690": 5,
    "699": 4,
    "700": 7,
    "770": 4,
    "777": 1,
    "778": 2,
    "779": 3,
    "780": 5,
    "788": 3,
    "789": 4,
    "790": 6,
    "799": 5,
    "800": 8,
    "880": 6,
    "888": 4,
    "889": 5,
    "890": 7,
    "899": 6,
    "900": 9,
    "990": 8,
    "999": 7,
}
export const PreWinDetails = ({ handleValues }) => {
    const [snackbarMessage, setSnackbarMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        result_date: dayjs().format('YYYY-MM-DD'),
        game_name: '',
        // subtitle: '***-**-***',
        // password: 'demo@123',
        session: '',
        openPanna: '',
        openDigit: '',
        closePanna: '',
        closeDigit: '',
        // close: '10:45 PM',
        // coins: 1000,
        // phone: '8209555243',
        // state: 'los-angeles',
        // country: 'USA'
    });
    // State to hold game titles
    const [gameTitles, setGameTitles] = useState([
        {
            value: '',
            label: '',
        },
    ]);
    const [gameRates, setGameRates] = useState({
        singleDigitValue1: '',
        singleDigitValue2: '',
        jodiDigitValue1: '',
        jodiDigitValue2: '',
        singlePannaValue1: '',
        singlePannaValue2: '',
        doublePannaValue1: '',
        doublePannaValue2: '',
        triplePannaValue1: '',
        triplePannaValue2: '',
        halfSangamValue1: '',
        halfSangamValue2: '',
        fullSangamValue1: '',
        fullSangamValue2: '',
    })
    // const [tableData, setTableData] = useState([]);

    const handleSave = async () => {
        if (!values.openPanna) {
            setSnackbarMessage('Please select Open Panna!');
            return;
        }else if(values.session === 'close' && !values.closePanna){
            setSnackbarMessage('Please select Close Panna!');
            return;
        }

        const resultDate = new Date(values.result_date).toDateString();
        // const resultQuery = query(collection(db, 'Result'), where('result_date', '==', resultDate), where('game_name', '==', values.game_name));
        // const resultSnapshot = await getDocs(resultQuery);

        // if (values.session === 'close' && resultSnapshot.empty) {
        //     handleOpenSnackbar('Please declare Open result first!');
        //     return;
        // }

        try {
            setLoading(true);

            const sessionType = values.session === 'open';
            let resultQueryEvents;
            if (sessionType) {
                // Fetch data from 'User_Events' collection where conditions match
                resultQueryEvents = query(collection(db, 'User_Events'),
                    where('event', '==', values.game_name),
                    where('date', '==', resultDate),
                    where('session', '==', values.session === 'open' ? 'Open' : '')
                );
            } else {
                // Fetch data from 'User_Events' collection where conditions match
                resultQueryEvents = query(collection(db, 'User_Events'),
                    where('event', '==', values.game_name),
                    where('date', '==', resultDate),
                );
            }

            const resultSnapshotEvents = await getDocs(resultQueryEvents);

            if (!resultSnapshotEvents.empty) {
                const resultData = resultSnapshotEvents.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.ref.id,
                }));
                // console.log(resultData)
                if (values.session === 'open') {
                    const filteredDigit = resultData.filter(item => item.session === 'Open' && item.opendigit === values.openDigit);
                    const filteredPanna = resultData.filter(item => item.session === 'Open' && item.openpanna === values.openPanna);
                    const mergedData = [...filteredDigit, ...filteredPanna];

                    // const winningResults = mergedData.map((data) => {
                    //     const wininngPoint = calculateWinningPoints(gameRates, data.game, parseFloat(data.points));

                    //     const winningHistoryData = {
                    //         name: data.name,
                    //         points: data.points,
                    //         won: wininngPoint,
                    //         game: data.game,
                    //         phone: data.phone,
                    //         session: data.session.toLowerCase(),
                    //         event: data.event,
                    //         date: data.date,
                    //     };
                    //     return winningHistoryData;
                    // });
                    const updatedMergedData = mergedData.map((data) => {
                        const wininngPoint = calculateWinningPoints(gameRates, data.game, parseFloat(data.points));

                        const updatedData = {
                            ...data,
                            game_type: data?.game,
                            openpanna: data?.openpanna ? data.openpanna : 'N/A',
                            closepanna: data?.closepanna ? data.closepanna : 'N/A',
                            opendigit: data?.opendigit ? data.opendigit : 'N/A',
                            closedigit: data?.closedigit ? data.closedigit : 'N/A',
                            won: wininngPoint, // Assuming you want to store the won value with 2 decimal places
                        };

                        return updatedData;
                    });
                    handleValues(updatedMergedData);
                    // setTableData(winningResults);
                } else {
                    // if (!resultSnapshot.empty) {
                        // const openResultData = resultSnapshot.docs[0].data();
                        // const { open } = openResultData;

                        // Extract opendigit and openpanna from the 'open' result
                        // const [openpanna, opendigit] = open.split('-');
                        const openpanna = values.openPanna;
                        const opendigit = values.openDigit;

                        // Filter data based on opendigit, openpanna, closedigit, closepanna
                        const filteredData = resultData.filter(item =>
                            (item.opendigit === opendigit ||
                                item.openpanna === openpanna) &&
                            (item.closedigit === values.closeDigit ||
                                item.closepanna === values.closePanna)
                        );
                        // Additional filter conditions based on game
                        const gameFilterData = resultData.filter(item => {
                            const gameName = item.game;

                            switch (gameName) {
                                case 'Single Digit':
                                    return item.closedigit === values.closeDigit;
                                case 'Single Panna':
                                    return item.closepanna === values.closePanna;
                                case 'Double Panna':
                                    return item.closepanna === values.closePanna;
                                case 'Triple Panna':
                                    return item.closepanna === values.closePanna;
                                default:
                                    return null; // Default condition
                            }
                        });

                        const mergedData = [...gameFilterData, ...filteredData];

                        // const winningResults = mergedData.map((data) => {
                        //     const wininngPoint = calculateWinningPoints(gameRates, data.game, parseFloat(data.points));

                        //     const winningHistoryData = {
                        //         name: data.name,
                        //         points: data.points,
                        //         won: wininngPoint,
                        //         game: data.game,
                        //         phone: data.phone,
                        //         session: data.session.toLowerCase(),
                        //         event: data.event,
                        //         date: data.date,
                        //     };
                        //     return winningHistoryData;
                        // });
                        const updatedMergedData = mergedData.map((data) => {
                            const wininngPoint = calculateWinningPoints(gameRates, data.game, parseFloat(data.points));

                            const updatedData = {
                                ...data,
                                game_type: data?.game,
                                openpanna: data?.openpanna ? data.openpanna : 'N/A',
                                closepanna: data?.closepanna ? data.closepanna : 'N/A',
                                opendigit: data?.opendigit ? data.opendigit : 'N/A',
                                closedigit: data?.closedigit ? data.closedigit : 'N/A',
                                won: wininngPoint, // Assuming you want to store the won value with 2 decimal places
                            };

                            return updatedData;
                        });
                        handleValues(updatedMergedData);
                        // setTableData(winningResults);
                    // } else {
                    //     // Handle case when no open result data is found
                    //     handleOpenSnackbar('No open result data found for the specified game and date.');
                    // }
                }
            } else {
                // Handle case when no data is found
            }
        } catch (error) {
            console.error('Error fetching data: ', error);
            handleOpenSnackbar('Error fetching data. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    // Function to fetch game titles from Firebase
    const fetchGameTitles = async () => {
        try {
            // Replace this with the actual logic to fetch game titles from Firebase
            // For example, if you're using Firestore
            const eventsCollection = collection(db, 'Events');
            const eventsSnapshot = await getDocs(eventsCollection);

            const titles = eventsSnapshot.docs.map(doc => ({
                value: doc.data().title, // Keep original casing as label
                label: `${doc.data().title.toUpperCase()} (${doc.data().open} - ${doc.data().close})`, // Set value to lowercase
            }));

            // Update the gameTitles state by merging the existing titles with the new ones
            setGameTitles([{
                value: '',
                label: '',
            },
            ...titles]);
            try {
                const q = query(collection(db, 'admin'), where('name', '==', 'GameRates'));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const adminDoc = querySnapshot.docs[0].data();
                    setGameRates({
                        singleDigitValue1: adminDoc?.singleDigitValue1 || '',
                        singleDigitValue2: adminDoc?.singleDigitValue2 || '',
                        jodiDigitValue1: adminDoc?.jodiDigitValue1 || '',
                        jodiDigitValue2: adminDoc?.jodiDigitValue2 || '',
                        singlePannaValue1: adminDoc?.singlePannaValue1 || '',
                        singlePannaValue2: adminDoc?.singlePannaValue2 || '',
                        doublePannaValue1: adminDoc?.doublePannaValue1 || '',
                        doublePannaValue2: adminDoc?.doublePannaValue2 || '',
                        triplePannaValue1: adminDoc?.triplePannaValue1 || '',
                        triplePannaValue2: adminDoc?.triplePannaValue2 || '',
                        halfSangamValue1: adminDoc?.halfSangamValue1 || '',
                        halfSangamValue2: adminDoc?.halfSangamValue2 || '',
                        fullSangamValue1: adminDoc?.fullSangamValue1 || '',
                        fullSangamValue2: adminDoc?.fullSangamValue2 || '',
                    })
                }
            } catch (error) {
                console.log('Error fetching game rates.')
            }
        } catch (error) {
            console.error('Error fetching game titles:', error);
        }
    };
    const handleChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            setValues((prevState) => ({
                ...prevState,
                [name]: value
            }));

            // If the changed field is 'panna', set the corresponding 'digit' based on the selected 'panna'
            if (name === 'session') {
                // Update the 'digit' value in the state
                setValues((prevState) => ({
                    ...prevState,
                    closeDigit: '',
                    closePanna: '',
                }));
            }
            if (name === 'openPanna') {
                const selectedPanna = value;
                const correspondingDigit = data[selectedPanna];

                // Update the 'digit' value in the state
                setValues((prevState) => ({
                    ...prevState,
                    openDigit: correspondingDigit.toString()
                }));
            }
            if (name === 'closePanna') {
                const selectedPanna = value;
                const correspondingDigit = data[selectedPanna];

                // Update the 'digit' value in the state
                setValues((prevState) => ({
                    ...prevState,
                    closeDigit: correspondingDigit.toString()
                }));
            }
            // setShowButton(false);
            handleValues([]);
        },
        []
    );
    const handleSubmit = (event) => {
        event.preventDefault();
        // Other form submission logic
        if (!values.game_name || !values.session || !values.openPanna) {
            setSnackbarMessage('Please Fill all fields!');
            return;
        }
        // If the form is successfully submitted, call the callback function
        handleSave();
    };
    useEffect(() => {
        fetchGameTitles();
    }, [])
    const handleOpenSnackbar = (message) => {
        setSnackbarMessage(message);
    };
    const handleCloseSnackbar = () => {
        setSnackbarMessage(null);
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={!!snackbarMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
            <form
                autoComplete="off"
                noValidate
                onSubmit={handleSubmit}
            >
                <Card sx={{ border: '1px solid #556ee6' }}>
                    <CardHeader
                        // subheader="The information can be edited"
                        title="Select Game"
                    />
                    <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                            <Grid
                                container
                                spacing={3}
                            >
                                {/* <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    // helperText="Please specify the first name"
                                    label="Game Title"
                                    name="title"
                                    onChange={handleChange}
                                    required
                                    value={values.title}
                                />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Please specify the Yes or No"
                                    label="Active status"
                                    name="isPlay"
                                    onChange={handleChange}
                                    required
                                    value={values.isPlay}
                                />
                            </Grid> */}
                                <Grid
                                    xs={12}
                                    md={3}
                                    lg={3}
                                >
                                    <Stack sx={{
                                        '& .css-4jnixx-MuiStack-root': {
                                            padding: '2px'
                                        }
                                    }}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    label="Result Date"
                                                    value={dayjs(values.result_date)}
                                                    onChange={(newValue) => {
                                                        setValues((prevState) => ({
                                                            ...prevState,
                                                            result_date: newValue.format('YYYY-MM-DD'),
                                                        }));
                                                    }}
                                                    textField={(props) => (
                                                        <TextField fullWidth label="Result Date" {...props} sx={{ width: '100%' }} />
                                                    )}
                                                    slotProps={{
                                                        textField: {
                                                            helperText: 'MM/DD/YYYY',
                                                        },
                                                    }}
                                                    maxDate={dayjs()} // Disable future dates
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </Stack>
                                    {/* <TextField
                                    fullWidth
                                    label="Open Time"
                                    name="open"
                                    type='timepicker'
                                    onChange={handleChange}
                                    required
                                    value={values.open}
                                /> */}
                                </Grid>
                                {/* <Grid
                                xs={12}
                                md={6}
                            >
                                <Stack sx={{
                                    '& .css-4jnixx-MuiStack-root': {
                                        padding: '2px'
                                    }
                                }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['TimePicker']}>
                                            <TimePicker
                                                label="Close Time"
                                                value={dayjs(values.close, 'hh:mm A')}
                                                onChange={(newValue) => handleTimeChange('close', newValue)}
                                                textField={(props) => (
                                                    <TextField
                                                        fullWidth
                                                        label="Close Time"
                                                        {...props}
                                                        sx={{
                                                            width: '100%',
                                                        }}
                                                    />
                                                )}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Stack>
                            </Grid> */}
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Select Game Name"
                                        name="game_name"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.game_name}
                                    >
                                        {gameTitles.map((option, index) => (
                                            <option
                                                key={index}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={3}
                                >
                                    <TextField
                                        fullWidth
                                        label="Select Session"
                                        name="session"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.session}
                                    >
                                        {session.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={4}
                                >
                                    <TextField
                                        fullWidth
                                        label="Select Open Panna"
                                        name="openPanna"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.openPanna}
                                    >
                                        {states.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>
                                {values.session === 'close' && <Grid
                                    xs={12}
                                    md={4}
                                >
                                    <TextField
                                        fullWidth
                                        label="Select Close Panna"
                                        name="closePanna"
                                        onChange={handleChange}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={values.closePanna}
                                    >
                                        {states.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>
                                </Grid>}
                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </CardActions>
                </Card>
            </form>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};
