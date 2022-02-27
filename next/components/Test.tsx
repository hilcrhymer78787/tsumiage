import * as React from 'react';
export default function Sample() {
    const [value, setValue] = React.useState<number>(5);
    return (
        <>
            <div>サンプル</div>
            {value}
        </>
    );
}
