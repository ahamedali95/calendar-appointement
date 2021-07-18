import {Reminder} from "../redux/dayInfo";

class ReminderUtil {
    static getTwentyFourHourTimeSlots = () => {
        const twentyFourHourTimeSlots = {};

        for (let i = 1; i < 25; i ++) {
            twentyFourHourTimeSlots[i] = [];
        }

        return twentyFourHourTimeSlots;
    };

    static sortReminders(reminders: Reminder[]): Record<string, Reminder[]> {
        const obj = ReminderUtil.getTwentyFourHourTimeSlots();

        for (const d of reminders) {
            const key = d.time.split(':')[0];

            obj[key] = [ ...obj[key],  d].sort((a: Reminder, b: Reminder) => {
                return new Date(1970, 0, 1, Number(a.time.split(':')[0]), Number(a.time.split(':')[1])).valueOf() -
                    new Date(1970, 0, 1, Number(b.time.split(':')[0]), Number(b.time.split(':')[1])).valueOf()
            });
        }

        return obj;
    }
}

export default ReminderUtil;