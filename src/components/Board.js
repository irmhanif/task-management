import * as React from 'react';
import { ImageList } from '@mui/material';


export default function ColumnsGrid() {
    let data = [{
        columnName: 'todo'
    },
    {
        columnName: 'todo'
    }]
    for(let i=1;i<=10;i++) {
        data.push({columnName: `todo ${i}`})
    }
  return (
    <ImageList
      sx={{
        gridAutoFlow: "column",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr)) !important",
        gridAutoColumns: "minmax(240px, 1fr)",
        gap: "25px"
      }}
      className={'boxCon'}
    >
      {data.map((cdata) => (
        <div className='columns'>{cdata.columnName}</div>
      ))}
    </ImageList>
  );
}