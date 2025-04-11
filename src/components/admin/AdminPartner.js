import axios from "axios";
import { useEffect, useState } from "react";
import { getKoreanToday } from "../utils/metaSet";
import {
  Autocomplete,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { placeTypeState } from "../utils/RecoilData";

const AdminPartner = () => {
  const inputStyle = {
    width: "200px",
    height: "40px",
    fontSize: "14px",
    borderRadius: "4px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ccc",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#27b778",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#27b778",
    },
  };
  const [popular, setPopular] = useState();
  const today = getKoreanToday();
  const placeType = useRecoilValue(placeTypeState);

  const [cat1, setCat1] = useState([]);
  const [cat2, setCat2] = useState([]);
  const [cat3, setCat3] = useState([]);
  const [area, setArea] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_SERVER}/search/popular?date=${today}`)
      .then((res) => {
        setPopular(res.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_SERVER}/place/category`)
      .then((res) => {
        setCat1(res.data.cat1);
        setCat2(res.data.cat2);
        setCat3(res.data.cat3);
      });
  }, []);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_SERVER}/place/area`).then((res) => {
      setArea(res.data);
    });
  }, []);
  const [formData, setFormData] = useState({
    keyword: "",
    type: "",
    cat1: "",
    cat2: "",
    cat3: "",
    area: "",
    placeId: "",
  });
  return (
    <div className="hot-keyword-wrap">
      <h2>인기 검색어</h2>
      <div className="popular">
        {popular && (
          <>
            <div>
              <h4>일간</h4>
              {popular.daily.map((p, i) => (
                <p key={"daily-" + i}>
                  {p.query}/{p.count}회
                </p>
              ))}
            </div>
            <div>
              <h4>주간</h4>
              {popular.weekly.map((p, i) => (
                <p key={"weekly-" + i}>
                  {p.query}/{p.count}회
                </p>
              ))}
            </div>
            <div>
              <h4>월간</h4>
              {popular.monthly.map((p, i) => (
                <p key={"monthly-" + i}>
                  {p.query}/{p.count}회
                </p>
              ))}
            </div>
            <div>
              <h4>연간</h4>
              {popular.yearly.map((p, i) => (
                <p key={"yearly-" + i}>
                  {p.query}/{p.count}회
                </p>
              ))}
            </div>
          </>
        )}
      </div>
      <h2>키워드 관리</h2>
      <div className="keyword-manage">
        <div className="check">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <AutocompleteForm
              id="keyword"
              label="키워드 검색"
              formData={formData}
              setFormData={setFormData}
              controller="keyword"
            />
            <button style={{ display: "none" }}></button>
          </form>
        </div>
        <div className="insert">
          <h3>키워드 업데이트</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="info-grid">
              <div className="input-wrap">
                <InputLabel
                  shrink
                  id="keyword-label"
                  sx={{
                    position: "static",
                    transform: "none",
                    fontSize: "14px",
                    marginBottom: "4px",
                    color: "#333",
                    "&.Mui-focused": {
                      color: "#3d3d3d",
                      fontFamily: "ns-b",
                    },
                    "& .MuiFormLabel-asterisk": {
                      display: "none",
                    },
                  }}
                >
                  키워드
                </InputLabel>
                <OutlinedInput
                  notched={false}
                  value={formData.keyword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      keyword: e.target.value,
                    }))
                  }
                  sx={inputStyle}
                  name="keyword"
                />
              </div>
              <SelectForm
                inputStyle={inputStyle}
                formData={formData}
                setFormData={setFormData}
                cat={placeType}
                id="type"
                label="타입"
              />
              <SelectForm
                inputStyle={inputStyle}
                formData={formData}
                setFormData={setFormData}
                cat={area}
                id="area"
                label="지역"
              />
              <SelectForm
                inputStyle={inputStyle}
                formData={formData}
                setFormData={setFormData}
                cat={cat1}
                id="cat1"
                label="카테고리1"
              />
              <SelectForm
                inputStyle={inputStyle}
                formData={formData}
                setFormData={setFormData}
                cat={cat2}
                id="cat2"
                label="카테고리2"
              />
              <SelectForm
                inputStyle={inputStyle}
                formData={formData}
                setFormData={setFormData}
                cat={cat3}
                id="cat3"
                label="카테고리3"
              />
            </div>
            <AutocompleteForm
              id="placeId"
              label="장소 조회"
              formData={formData}
              setFormData={setFormData}
              controller="place"
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              className="keyword-submit"
            >
              확인
            </IconButton>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminPartner;

const AutocompleteForm = ({ id, label, formData, setFormData, controller }) => {
  const [inputText, setInputText] = useState("");
  const [check, setCheck] = useState([]);
  let key = "id";

  if (controller === "keyword") {
    key = "name";
  }
  useEffect(() => {
    if (!inputText) return setCheck([]);
    const lastChar = inputText.slice(-1);
    const isKoreanSyllable =
      lastChar &&
      lastChar.charCodeAt(0) >= 0xac00 &&
      lastChar.charCodeAt(0) <= 0xd7a3;
    if (!isKoreanSyllable) return;
    axios
      .get(
        `${process.env.REACT_APP_BACK_SERVER}/search/${controller}?query=${inputText}`
      )
      .then((res) => {
        setCheck(res.data);
      });
  }, [inputText]);
  const onChange = (e, newValue) => {
    setFormData((prev) => ({
      ...prev,
      [id]: newValue?.id || "",
    }));
  };
  return (
    <Autocomplete
      disablePortal
      options={check}
      value={check.find((opt) => opt[id] === formData[id]) || null}
      onChange={onChange}
      inputValue={inputText}
      onInputChange={(e, val) => setInputText(val)}
      getOptionLabel={(option) => `${option.name} | ID:${option.id} `}
      isOptionEqualToValue={(a, b) => a[key] === b[key]}
      noOptionsText="결과 없음"
      sx={{ mt: 3 }}
      renderInput={(params) => (
        <TextField
          {...params}
          className="input-wrap autocomplete"
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            notched: false,
          }}
          slotProps={{
            inputLabel: {
              sx: {
                position: "static",
                transform: "none",
                fontSize: "14px",
                p: "1",
                color: "#333",
                "&.Mui-focused": {
                  color: "#3d3d3d",
                },
                "& .MuiFormLabel-asterisk": {
                  display: "none",
                },
              },
            },
          }}
        />
      )}
    />
  );
};
const SelectForm = ({ inputStyle, formData, setFormData, cat, id, label }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="input-wrap">
      <InputLabel
        shrink
        id={`${id}-label`}
        sx={{
          position: "static", // 기본 absolute → static으로 풀기
          transform: "none", // 이동 해제
          fontSize: "14px", // 원하는 스타일
          color: "#333",
          "&.Mui-focused": {
            color: "#3d3d3d",
            fontFamily: "ns-b",
          },
          "& .MuiFormLabel-asterisk": {
            display: "none", // ← 요거!
          },
        }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${id}-label`}
        name={id}
        value={formData[id]}
        label={label}
        onChange={handleChange}
        input={
          <OutlinedInput
            notched={false} // notch 비활성화
            sx={inputStyle}
          />
        }
      >
        <MenuItem value="">
          <span>해당없음</span>
        </MenuItem>
        {cat.map((c, i) => (
          <MenuItem key={c.id + i} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
