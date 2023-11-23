import { CategoryItemProps } from "@/interface"
import Link from "next/link"


const NavbarMobile = ({ listCate ,onClickactiveToggle, openLoginModal}: { listCate: CategoryItemProps[], onClickactiveToggle: any , openLoginModal : any }) => {
    return (
        <div className="navbar-mobile fixed h-screen overflow-y-auto z-10 bg-white w-full" id="navbar-mobile">
            <div className="p-2">
                <ul>
                    <Link href={`/`}><li onClick={onClickactiveToggle}>Trang chủ</li></Link>
                    <Link href={`/ti-so-truc-tiep`}><li onClick={onClickactiveToggle}>Tỉ số trực tiếp</li></Link>
                    {/* <Link href={`/the-thao/sea-games-32`}><li>Seagame 32</li></Link> */}
                    {listCate?.map(item => {
                        return <Link key={item.slug} href={`/${item.slug}`}><li onClick={onClickactiveToggle}>{item.name}</li></Link>
                    })}
                    <li onClick={() => (onClickactiveToggle(), openLoginModal())} className="cursor-pointer">Đăng nhập</li>
                </ul>
            </div>
        </div>
    )
}

export default NavbarMobile