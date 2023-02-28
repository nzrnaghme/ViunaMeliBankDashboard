import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { getItem } from 'api/storage/storage'
import { getAllCourse } from 'api/Core/Course'
import { trackPromise } from 'react-promise-tracker'

export default function Planning() {
    const role = getItem('role');
    const userId = getItem('id');

    var jalaali = require('jalaali-js');

    const Colos = ['#e077ca', "#e0778e", "#bda0a7", "#71e3d2", "#257d70", "#4858c2", "#8f96c4", "#a181cc", "#5510b3", "#3acf9d", "#096345", "#1ac742", "#a5cfaf", "#95db70", "#4b8c29", "#aebd51", "#d1b13f", "#e3b309", "#e36f09", "#ebaf7a", "#75471d", "#75301d", "#b84221", "#e39078", "#ed5c75", "#b83e53", "#3a8571"]

    const [coursePlaning, setCoursePlaning] = useState()

    useEffect(() => {
        trackPromise(getAllCourses())
    }, [])

    const getAllCourses = async () => {
        let response = await getAllCourse();
        if (response.data.result) {
            if (role === 'admin') {
                let rightData = response.data.result.map((item, key) => ({
                    title: item.title,
                    start: changeDate(item.startDate),
                    end: changeDate(item.endDate),
                    color: Colos[key]
                }));
                setCoursePlaning(rightData)
            } else {
                var courseFormTeacher = response.data.result.filter((item) => item.teacher._id === userId);
                let rightData = courseFormTeacher.map((item, key) => ({
                    title: item.title,
                    start: changeDate(item.startDate),
                    end: changeDate(item.endDate),
                    color: Colos[key]
                }));
                setCoursePlaning(rightData)
            }
        }
    }

    const changeDate = (date) => {
        var datePirsianStart = date.split("T")[0].split("-")
        var dateEnglishStart = jalaali.toGregorian(Number(datePirsianStart[0]), Number(datePirsianStart[1]), Number(datePirsianStart[2]))
        return new Date(`${dateEnglishStart.gy}/${dateEnglishStart.gm}/${dateEnglishStart.gd}`)
    }


    return (
        <>
            {coursePlaning && coursePlaning.length > 0 ?
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    locale='fa'
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}

                    events={coursePlaning}
                />
                : <div style={{ textAlign: 'center' }}>دوره ثبت نشده که در برنامه روزانه نشان داده شود</div>}
        </>
    )
}