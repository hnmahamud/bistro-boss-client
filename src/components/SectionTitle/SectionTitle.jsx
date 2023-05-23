const SectionTitle = ({ heading, subHeading, clr }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <p className="text-yellow-500 italic pb-2">---{subHeading}---</p>
      <h3 className={`${clr && clr} text-4xl border-y-4 py-4`}>{heading}</h3>
    </div>
  );
};

export default SectionTitle;
