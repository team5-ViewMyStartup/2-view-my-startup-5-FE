export const companyOptions = [
  { label: "누적 투자금액 높은순", value: "investment-high", className: "investment_high" },
  { label: "누적 투자금액 낮은순", value: "investment-low", className: "investment_low" },
  { label: "매출액 높은순", value: "sales-high", className: "sales_high" },
  { label: "매출액 낮은순", value: "sales-low", className: "sales_low" },
  { label: "고용 인원 많은순", value: "employeeNum-high", className: "employeeNum_high" },
  { label: "고용 인원 적은순", value: "employeeNum-low", className: "employeeNum_low" },
];

export const compareOptions = [
  { label: "나의 기업 선택 횟수 높은순", value: "selection-high", className: "selection_high" },
  { label: "나의 기업 선택 횟수 낮은순", value: "selection-low", className: "selection_low" },
  {
    label: "비교 기업 선택 횟수 높은순",
    value: "compare-selection-high",
    className: "compare_selection_high",
  },
  {
    label: "비교 기업 선택 횟수 낮은순",
    value: "compare-selection-low",
    className: "compare_selection_low",
  },
];

export const investmentOptions = [
  {
    label: "View My Startup 투자 금액 높은순",
    value: "startup-investment-high",
    className: "startup_investment_high",
  },
  {
    label: "View My Startup 투자 금액 낮은순",
    value: "startup-investment-low",
    className: "startup_investment_low",
  },
  {
    label: "실제 누적 투자 금액 높은 순",
    value: "actual-investment-high",
    className: "actual_investment_high",
  },
  {
    label: "실제 누적 투자 금액 낮은 순",
    value: "actual-investment-low",
    className: "actual_investment_low",
  },
];

export const rankingOptions = [
  {
    label: "매출액 높은순",
    value: "sales-high",
    className: "sales_high",
  },
  {
    label: "매출액 낮은순",
    value: "sales-low",
    className: "sales_low",
  },
  {
    label: "고용인원 높은순",
    value: "employeeNum-high",
    className: "employeeNum_high",
  },
  {
    label: "고용인원 낮은순",
    value: "employeeNum-low",
    className: "employeeNum_low",
  },
];
/**
 * 옵션 파일 inport하기
 *  const [orderBy, setOrderBy] = useState("누적 투자 금액 높은순")
 * <Dropdown options={companyOptions}
 * selectedOption={orderBy}
 * onSelect={setOrderBy} />
 */
