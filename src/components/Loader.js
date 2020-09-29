import React from 'react';
const Loader = () => {
    return (
        <>
            <div className="text-center my-5">
                <div className="lds-dual-ring">

                </div>
                <style jsx>{`
                    .lds-dual-ring {
                        display: inline-block;
                        width: 80px;
                        height: 80px;
                    }
                    .lds-dual-ring:after {
                        content: " ";
                        display: block;
                        width: 64px;
                        height: 64px;
                        margin: 8px;
                        border-radius: 50%;
                        border: 6px solid #fff;
                        border-color: #000 transparent #000 transparent;
                        animation: lds-dual-ring 1.2s linear infinite;
                    }
                    @keyframes lds-dual-ring {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}
                </style>
            </div>
        </>
    );
}
 
export default Loader;