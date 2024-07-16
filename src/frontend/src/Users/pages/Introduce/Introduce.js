import React from 'react';
import './Introduce.css';
import taynambo from '../../../assets/taynambo.jpg';
import banhpia from '../../../assets/banhpia.jpg';
import bunnuocleo from '../../../assets/bunnuocleo.jpg';
import duasap from '../../../assets/duasap.jpg';
import duahau from '../../../assets/duahau.jpg';
import xuanthanh from '../../../assets/xuanthanh.jpg';
import man from '../../../assets/man.jpg';
import nuocmamruoi from '../../../assets/nuocmamruoi.jpg';
import nuocmamphuquoc from '../../../assets/nuocmamphuquoc.jpg';


const Introduce = () => {
    return (
        <div className="introduce-container">
            <div className="introduce-card">
                <div className="info">
                    <h1 className='info h1'><strong>1. Giới thiệu về Tây Nam Bộ</strong></h1>
                    <p>Tây Nam Bộ, còn được gọi là miền Tây hoặc Đồng bằng sông Cửu Long, là một khu vực nằm ở phía Nam Việt Nam, nổi tiếng với cảnh quan sông nước trù phú và văn hóa đa dạng. Đây là vùng đất màu mỡ, được bồi đắp bởi hệ thống sông ngòi chằng chịt, đặc biệt là sông Cửu Long, một trong những con sông dài và quan trọng nhất khu vực.</p>
                    <div className="image-container">
                        <img src={taynambo} alt="Hình ảnh Tây Nam Bộ" className="taynambo" />
                    </div>
                    <p>Tây Nam Bộ bao gồm 13 tỉnh thành: Long An, Tiền Giang, Bến Tre, Vĩnh Long, Trà Vinh, Hậu Giang, Sóc Trăng, Bạc Liêu, Cà Mau, Đồng Tháp, An Giang, Kiên Giang, và thành phố Cần Thơ. Vùng này nổi tiếng với hệ thống sông rạch, kênh mương phong phú, là nơi sản xuất nông nghiệp chính của cả nước, đặc biệt là lúa gạo, cây ăn trái và thủy sản.</p>
                    <h1><strong>2. Đặc sản Tây Nam Bộ</strong></h1>
                    <p>Với hệ thống sông ngòi chằng chịt và đất đai màu mỡ, nơi đây không chỉ nổi tiếng với cảnh quan thiên nhiên tươi đẹp mà còn được biết đến bởi sự phong phú và đa dạng của các đặc sản ẩm thực. </p>
                    <h2>* Thức ăn</h2>
                    <p ><strong>Bánh pía Sóc Trăng: </strong>Bánh pía là loại bánh ngọt làm từ bột mì, đậu xanh, sầu riêng và lòng đỏ trứng muối. Vỏ bánh mỏng nhiều lớp, nhân bánh thơm ngon, béo ngậy.</p>
                    <div className="image-container">
                        <img src={banhpia} alt="Hình ảnh Tây Nam Bộ" className="taynambo" />
                    </div>
                    <br></br>
                    <p><strong>Bún nước lèo Trà Vinh: </strong>Bánh pía là loại bánh ngọt làm từ bột mì, đậu xanh, sầu riêng và lòng đỏ trứng muối. Vỏ bánh mỏng nhiều lớp, nhân bánh thơm ngon, béo ngậy.</p>
                    <div className="image-container">
                        <img src={bunnuocleo} alt="Hình ảnh Tây Nam Bộ" className="taynambo" />
                    </div>
                    <br></br>
                    <h2>* Trái cây</h2>
                    <p><strong>Dừa sáp: </strong>Dừa sáp có lớp cùi dày, mềm dẻo và có vị béo ngậy, khác biệt so với các loại dừa thông thường.</p>
                    <div className="image-container">
                        <img src={duasap} alt="Hình ảnh Tây Nam Bộ" className="taynambo" />
                    </div>
                    <br></br>
                    <p><strong>Dưa hấu Long Trì: </strong>Dưa hấu Long Trì có vỏ màu xanh đậm, hạt màu đen, giòn ngọt và nước nhiều.</p>
                    <div className="image-container">
                        <img src={duahau} alt="Hình ảnh Tây Nam Bộ" className="taynambo" />
                    </div>
                    <br></br>
                    <h2>* Rượu</h2>
                    <p><strong>Rượu xuân thạnh: </strong>Rượu Xuân Thạnh không chỉ là đồ uống phổ biến mà còn là món quà ý nghĩa trong các dịp lễ tết của người dân vùng sông nước.</p>
                    <div className="image-container">
                        <img src={xuanthanh} alt="Hình ảnh Tây Nam Bộ" className="taynambo" />
                    </div>
                    <br></br>
                    <p><strong>Rượu mận Cần Thơ: </strong> Rượu mận Cần Thơ là một đặc sản nổi tiếng của vùng Đồng bằng sông Cửu Long, được chế biến từ trái mận Cần Thơ, một loại trái cây phổ biến và ngon miệng ở miền Tây Nam Bộ.</p>
                    <div className="image-container">
                        <img src={man} alt="Hình ảnh Tây Nam Bộ" className="taynambo" />
                    </div>
                    <br></br>
                    <h2>* Gia vị</h2>
                    <p><strong>Nước mắm Rươi </strong> Nước mắm Rươi có màu vàng sáng, vị ngọt thanh và thơm đặc trưng từ cá Rươi khô, được ủ lâu năm để có hương vị đậm đà.</p>
                    <div className="image-container">
                        <img src={nuocmamruoi} alt="Hình ảnh Tây Nam Bộ" className="taynambo" />
                    </div>
                    <br></br>
                    <p><strong>Nước mắm Phú Quốc: </strong> Nước mắm Phú Quốc có màu sắc đậm hơn, hương thơm đặc biệt từ cá cơm, tạo nên sự phong phú và đa dạng trong ẩm thực miền Nam Việt Nam.</p>
                    <div className="image-container">
                        <img src={nuocmamphuquoc} alt="Hình ảnh Tây Nam Bộ" className="taynambo" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Introduce;
