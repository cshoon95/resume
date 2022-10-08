import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import hp from '../../core/Hp';
import Standard from '../../core/Standard';
import styled from 'styled-components';

type PatternType = {
    onlyNum: RegExp;
    onlyNumDot: RegExp;
    onlyKor: RegExp;
};

type StandardGrade =
    | 'first'
    | 'second'
    | 'third'
    | 'fourth'
    | 'fifth'
    | 'nothing';

const patternObj: PatternType = {
    onlyNum: /[^0-9]/gi,
    onlyNumDot: /[^0-9.-]/gi,
    onlyKor: /[^ㄱ-ㅎㅏ-ㅣ가-힣]/gi,
};

const restrictMessages = {
    onlyNum: '숫자만 입력 가능합니다.',
    onlyNumDot: '숫자 형식으로 입력해주세요.',
    onlyKor: '한글만 입력 가능합니다.',
};

function CustomTextField({
    label,
    pattern,
    fixedValue,
    number,
    data,
    setData,
    name,
}: {
    label: string;
    pattern?: RegExp | keyof PatternType;
    fixedValue?: number | string;
    number: number;
    data?: any;
    setData?: any;
    name: string;
}) {
    // 나중에 서버 완성 후 각 번호에 따른 학생의 정보를 props로 받을 예정 (성별, 학년 정보를 위해)

    const standard = new Standard();

    // 라벨을 통해 측정 기준에 맞는 측정 함수(measurator) 불러오기
    const getStandardFunc = (label: string) => {
        switch (label) {
            case '오래달리기-걷기':
                return standard.longRunningAndWalking;
            case '왕복오래달리기':
                return standard.roundRunning;
            case '스텝검사':
                return standard.stepCheck;
            case '앉아윗몸앞으로굽히기':
                return standard.bendingForward;
            case '종합유연성검사':
                return standard.totalFlex;
            case '팔굽혀펴기':
                return standard.pushUps;
            case '악력':
                return standard.grip;
            case '50미터달리기':
                return standard.running50m;
            case '제자리멀리뛰기':
                return standard.longJump;
            default:
                return standard.bendingForward;
        }
    };
    // 인풋에 들어간 입력값에 대한 등급을 매겨주는 함수
    const gradeMeasurator = getStandardFunc(label);

    const [isErrorMsg, setIsErrorMsg] = useState(false);
    const [inputValue, setInputValue] = useState(data);

    const [grade, setGrade] = useState<StandardGrade>(() => {
        if (name !== 'name' && name !== 'number' && data) {
            const result = gradeMeasurator(data, '중3', 'man');
            return result !== null ? result : 'nothing';
        } else {
            return 'nothing';
        }
    });

    // 인풋 핸들러
    const handleInput = (e: any) => {
        let val = e.target.value;
        let msg = '';

        // 패턴 항목 체크
        if (typeof pattern === 'string') {
            msg = restrictMessages[pattern];
            pattern = patternObj[pattern];
        }

        // 패턴 체크
        if (pattern) val = val.replace(pattern, '');

        // 입력 불가항목
        if (e.target.value !== val) {
            setIsErrorMsg(true);
            setTimeout(() => {
                setIsErrorMsg(false);
            }, 1000);
            e.target.value = val;

            // 지금은 로그로만 제한 메시지 주고있는데 UI 얘기해봐야할듯.. 칸이 너무 작음
            hp.warnLog(msg);
        }
        // 인풋값에 따른 각 종목 등급 setState
        if (label !== '이름' && label !== '번호') {
            const gradeResult = gradeMeasurator(val, '중3', 'man');
            if (val && gradeResult) {
                setGrade(gradeResult);
            } else {
                setGrade('nothing');
            }
        }
        // 인풋값 setState
        setInputValue(val);

        // 전체 폼 데이터 상태 setState
        setData((current: any) => {
            if (name === 'name') {
                current[number - 1].name = val;
                return [...current];
            } else {
                current[number - 1].record[name] = val;
                return [...current];
            }
        });
    };

    // 라벨 핸들러
    const handleLabel = () => {
        return isErrorMsg && typeof pattern === 'string'
            ? restrictMessages[pattern]
            : label;
    };

    // 각 종목에 따른 단위 반환하는 함수
    const handleUnitLabel = (label: string) => {
        switch (label) {
            case '오래달리기-걷기':
                return '초';
            case '왕복오래달리기':
                return '회';
            case '스텝검사':
                return 'PEI';
            case '앉아윗몸앞으로굽히기':
                return 'cm';
            case '종합유연성검사':
                return '점';
            case '팔굽혀펴기':
                return '회';
            case '악력':
                return 'kg';
            case '50미터달리기':
                return '초';
            case '제자리멀리뛰기':
                return 'cm';
        }
    };

    return (
        <TextField
            id="outlined-basic"
            variant="outlined"
            size="small"
            sx={{
                backgroundColor: gradeColor[grade],
                borderRadius: '5px',
            }}
            color={isErrorMsg ? 'error' : 'success'} // 에러 발생시 색깔 변경
            label={handleLabel()} // 라벨 변경해서 에러 표시
            InputLabelProps={{
                style: { fontSize: 11, textAlign: 'center' },
            }}
            margin="dense"
            onChange={handleInput}
            value={fixedValue ? fixedValue : inputValue}
            name={name}
            InputProps={{
                endAdornment: <Adornment>{handleUnitLabel(label)}</Adornment>,
            }}
        />
    );
}

const Adornment = styled.div`
    font-size: 0.7rem;
    font-weight: 600;
`;

const gradeColor = {
    first: '#178bff4b',
    second: '#40d43b3b',
    third: '#e7ee2d45',
    fourth: '#ee942d52',
    fifth: '#e5383846',
    nothing: '',
};

export default CustomTextField;
