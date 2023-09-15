import DatePicker from "react-date-picker";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";

export default function DatePickerComponent(props) {
  return (
    <DatePicker
      className="display-flex"
      value={props.selectedDate}
      onChange={(e) => props.handleSelectedDate(format(e, "yyyy-MM-dd"))}
      maxDate={new Date()}
    />
  );
}
