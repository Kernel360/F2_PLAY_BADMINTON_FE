interface LeagueInfoProps {
  icon: React.ElementType;
  label: string; // 제목 또는 레이블
  value: string | number | null | undefined; // 값 (텍스트 또는 숫자)
}

function LeagueInfo(props: LeagueInfoProps) {
  const { icon: Icon, label, value } = props;
  return (
    <div>
      <div className="p-4 bg-gray-100 rounded-lg flex items-center gap-3">
        <Icon className="text-gray-500" size={24} />
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="text-sm font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default LeagueInfo;
