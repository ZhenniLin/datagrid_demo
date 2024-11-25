const Header: React.FC<{ title: string }> = ({ title }) => (
  <div className="pb-3">
    <h1 className="font-bold text-2xl border-b-2 pb-2">{title}</h1>
  </div>
);

export default Header;
